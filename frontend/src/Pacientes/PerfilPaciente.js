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

  const id = useParams().id

  useEffect(() => {
    patientService.getOne(id).then(response => {
      let patient = response

      if (patient.accessToken === 'expired') {
        patientService.refreshToken(id).then(response => {
          patient.accessToken = response.accessToken
        })
      }

      setPatient(patient)
    })
  }, [id])
  
  const { url } = useRouteMatch()

  return(
    <>
      <div>
        <div>Nome: {patient.name}</div>
        <div>Telefone: {patient.phone}</div>
        <div>ID Fitbit: {patient.fitbitId ? patient.fitbitId : <a href={`/auth/fitbit/${id}`}>Conectar ao Fitbit</a>}</div>
        
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
          <Dados fitbitId={patient.fitbitId} accessToken={patient.accessToken} />
        </Route>
        <Route path={`${url}/metas`}>
          <Metas />
        </Route>
      </Switch>
    </>
  )}

export default PerfilPaciente