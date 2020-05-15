import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import patientService from '../services/patients.js'

const ListaPacientes = () => {
  const [ patients, setPatients ] = useState(undefined) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  useEffect(() => {
    patientService.getAll().then(response => setPatients(response))
  }, [])
  
  const handleSubmit = event => {
    event.preventDefault()

    const foundPatient = patients.find(patient => patient.name === newName)
    if (foundPatient === undefined) {
      patientService.create({ name: newName, phone: newPhone })
        .then(response => {
          setPatients(patients.concat(response))
          setNewPhone('')
          setNewName('')
        })
        .catch(() => alert('nao foi possivel adicionar paciente'))
    } else {
      alert('Pessoa já adicionada')
    }
  }

  return(
    <div style={{ width: '250px' }}>
        <h1>Pacientes</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nameInput">Nome:</label>
              <input value={newName} onChange={event => setNewName(event.target.value)} className="form-control" id="nameInput"/>
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput">Telefone:</label>
              <input value={newPhone} onChange={event => setNewPhone(event.target.value)} className="form-control" id="phoneInput"/>
            </div>
            <button type="submit" className="btn btn-primary">Adicionar</button>
          </form>
        </div>

        {patients ?
          <div className="list-group my-3">
          {patients.map(patient => 
            <Link
              to={`pacientes/${patient.id}/resumo`}
              key={patient.id}
              className="list-group-item list-group-item-action text-primary"
            >
                {patient.name}
            </Link>
          )}
          </div>
          :
          <div class="d-flex align-items-center my-3">
            Carregando...
            <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
          </div>
          }
    </div>
  )}

export default ListaPacientes