import React, { useState, useEffect } from 'react'
import {
  Switch, Route, NavLink,
  useParams, useRouteMatch
} from 'react-router-dom'
import patientService from '../services/patients.js'

import Resumo from './Resumo'
import Dados from './Dados'
import Metas from './Metas'

const DadosPacientes = () => {
  const [ patient, setPatient ] = useState({})

  const id = useParams().id

  useEffect(() => {
    patientService.getOne(id).then(response => setPatient(response))
  }, [id])
  
  const { url } = useRouteMatch()

  return(
    <>
      <div>
        <div>Nome: {patient.name}</div>
        <div>Telefone: {patient.phone}</div>
        <div>Idade: </div>
        <div>Tipo de asma: </div>
        <div>Observações: </div>
        <div>Última Consulta: </div>
        <div>ID Fitbit: {patient.fitbitId}</div>
        <a href="http://localhost:3001/auth/fitbit">Conectar ao Fitbit</a>
      </div>

      <br/>

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
          <Dados id={id}/>
        </Route>
        <Route path={`${url}/metas`}>
          <Metas />
        </Route>
      </Switch>
    </>
  )}

export default DadosPacientes