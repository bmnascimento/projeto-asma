import React, { useState, useEffect } from 'react'
import patientService from './services/patients.js'

const App = () => {
  const [ patients, setPatients ] = useState([]) 
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

  return (
    <div>
      <h1>Pacientes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Nome: <input value={newName} onChange={event => setNewName(event.target.value)} />
        </div>
        <div>
          Telefone: <input value={newPhone} onChange={event => setNewPhone(event.target.value)} />
        </div>
        <div>
          <button type="submit">Adicionar</button>
        </div>
      </form>
      <ul>
        {patients.map(patient => 
          <li key={patient.name}>{patient.name} {patient.phone}</li>
        )}
      </ul>
    </div>
  )
}

export default App
