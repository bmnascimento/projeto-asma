import React, { useState, useEffect } from 'react'
import {
  Switch, Route, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

import patientService from './../../services/patients'
import sintomasService from './../../services/sintomas'

import Dados from './Dados'
import Metas from './Metas'
import Sintomas from './Sintomas'

const PerfilPaciente = () => {
  const [patient, setPatient] = useState(undefined)
  const [linhas, setLinhas] = useState([])
  const [linhasSintomas, setLinhasSintomas] = useState([])
  const [dataFormatada, setDataFormatada] = useState()
  const [dadosDone, setDadosDone] = useState(false)
  const [sintomasDone, setSintomasDone] = useState(false)

  const id = useParams().id

  useEffect(() => {
    const fetchFitBitData = async () => {
      try {
        const patient = await patientService.getOne(id)
        setPatient(patient)
        const dataFormatada = new Date(patient.birthDate)
        setDataFormatada(`${dataFormatada.getDate()}/${dataFormatada.getMonth()+1}/${dataFormatada.getFullYear()}`)
    
        // Request dos dados do Fitbit
        if (patient.fitbitId) {
          let promises = []
          const quantidadeLinhas = 5
    
          let date = new Date()
          for (let i = 0; i < quantidadeLinhas; i++) {
            promises.push(patientService.getData(id, date))
            date.setDate(date.getDate() - 1)
          }
    
          const responses = await Promise.all(promises)
    
          date = new Date()
    
          for (let i = 0; i < quantidadeLinhas; i++) {
            const response = responses[i]
    
            setLinhas(linhas => linhas.concat({
              data: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`,
              numPassos: response.summary.steps,
              minutosLeves: response.summary.lightlyActiveMinutes,
              minutosModerados: response.summary.fairlyActiveMinutes,
              minutosIntensos: response.summary.veryActiveMinutes,
              minutosSedentarios: response.summary.sedentaryMinutes
            }))
            date.setDate(date.getDate() - 1)
          }
        }

        setDadosDone(true)
      } catch (error) {
        console.error(error)
      }      
    }

    const fetchSintomas = async () => {
      try {
        // Request dos sintomas
        const listaSintomas = await sintomasService.getAll(id)
        setLinhasSintomas(listaSintomas)
        setSintomasDone(true)
      } catch(error) {
        console.error(error)
      }
    }

    fetchFitBitData()
    fetchSintomas()
  }, [id])

  const { url } = useRouteMatch()

  return (
    <>
      {!(dadosDone && sintomasDone) || patient === undefined
        ?
        <>
          <Spinner animation="border" role="status" size="sm"/> Carregando...
        </>
        :
        <>
          <div>
            <div>Nome: {patient.name}</div>
            <div>Peso: {patient.height} kg</div>
            <div>Altura: {patient.weight} cm</div>
            <div>Telefone: {patient.phone}</div>
            <div>RGHC: {patient.rghg}</div>
            <div>Data de Nascimento: {dataFormatada}</div>
            <div>ID Fitbit: {patient.fitbitId ? patient.fitbitId : <a href={`/auth/fitbit/${id}`}>Conectar ao Fitbit</a>}</div>

          </div>

          <br />

          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink to={`${url}/dados`} className="nav-link">Dados</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/metas`} className="nav-link">Metas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`${url}/sintomas`} className="nav-link">Sintomas</NavLink>
            </li>
          </ul>

          <Switch>
            <Route path={`${url}/dados`}>
              {patient.fitbitId ? <Dados linhas={linhas} /> : <div className="border-right border-bottom border-left p-3">Não há conexão com Fitbit</div>}
            </Route>
            <Route path={`${url}/metas`}>
              <Metas id={id} linhas={linhas} metas={patient.metas} />
            </Route>
            <Route path={`${url}/sintomas`}>
              <Sintomas lista={linhasSintomas}/>
            </Route>
          </Switch>
        </>
      }
    </>
  )
}

export default PerfilPaciente