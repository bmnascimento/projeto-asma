import React, { useState, useEffect } from 'react'
import {
  Switch, Route, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom'
import patientService from '../services/patients.js'

import Resumo from './Resumo'
import Dados from './Dados'
import Metas from './Metas'

const PerfilPaciente = () => {
  const [ patient, setPatient ] = useState({})
  const [ linhas, setLinhas ] = useState([])

  const id = useParams().id

  useEffect(() => {
    const fetchData = async () => {
      const patient = await patientService.getOne(id)
      setPatient(patient)

      if (patient.fitbitId) {
        let promises = []
        const quantidadeLinhas = 5

        let date = new Date()
        for (let i = 0; i < quantidadeLinhas; i++) {
          promises.push(patientService.getData(id, formatDate(date)))
          date.setDate(date.getDate() - 1)
        }

        const responses = await Promise.all(promises)

        date = new Date()

        for (let i = 0; i < quantidadeLinhas; i++) {
          const response = responses[i]

          setLinhas(linhas => linhas.concat({
            data: formatDate(date),
            numPassos: response.summary.steps,
            minutosAtivos: response.summary.fairlyActiveMinutes + response.summary.veryActiveMinutes,
            minutosSedentarios: response.summary.sedentaryMinutes
          }))
          date.setDate(date.getDate() - 1)
        }
      }
    }

    fetchData()
  }, [id])

  const { url } = useRouteMatch()

  return (
    <>
      <div>
        <div>Nome: {patient.name}</div>
        <div>Telefone: {patient.phone}</div>
        <div>ID Fitbit: {patient.fitbitId ? patient.fitbitId : <a href={`/auth/fitbit/${id}`}>Conectar ao Fitbit</a>}</div>

      </div>

      <br />

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink to={`${url}/resumo`} className="nav-link">Resumo</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`${url}/dados`} className="nav-link">Dados</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={`${url}/metas`} className="nav-link">Metas</NavLink>
        </li>
      </ul>

      <Switch>
        <Route path={`${url}/resumo`}>
          <Resumo />
        </Route>
        <Route path={`${url}/dados`}>
          <Dados linhas={linhas} />
        </Route>
        <Route path={`${url}/metas`}>
          <Metas />
        </Route>
      </Switch>
    </>
  )
}

const formatDate = date => {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('-')
}

export default PerfilPaciente