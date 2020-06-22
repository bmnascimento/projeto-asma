import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import patientService from '../../services/patients.js'
import Button from 'react-bootstrap/Button'

const ListaPacientes = () => {
  const [ patients, setPatients ] = useState(undefined)

  useEffect(() => {
    patientService.getAll().then(response => setPatients(response))
  }, [])

  return(
    <div style={{ width: '300px' }}>
        <Link to="/pacientes/cadastro"><Button className="float-right mt-1">Novo</Button></Link>
        <h1>Pacientes</h1>
          {patients
            ?
            <div className="list-group my-3">
            {patients.map(patient => 
              <Link
                to={`pacientes/${patient.id}/dados`}
                key={patient.id}
                className="list-group-item list-group-item-action text-primary"
              >
                  {patient.name}
              </Link>
            )}
            </div>
            :
            <div className="d-flex align-items-center my-3">
              Carregando...
              <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
            </div>
          }
    </div>
  )}

export default ListaPacientes