import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import patientService from '../services/patients.js'

const CadastroPaciente = () => {
  const [ patients, setPatients ] = useState(undefined) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newEmail, setNewEmail ] = useState('')
  const [ newHeight, setNewHeight ] = useState('')
  const [ newWeight, setNewWeight ] = useState('')
  const [ newRghg, setNewRghg ] = useState('')
  const [ newCpf, setNewCpf ] = useState('')
  const [ newFitbitId, setNewFitbitId ] = useState('')
  
  const handleSubmit = event => {
    event.preventDefault()

    const foundPatient = patients.find(patient => patient.name === newName)
    if (foundPatient === undefined) {
      patientService.create({ name: newName, phone: newPhone, email: newEmail, height: newHeight, weight: newWeight, Rghg: newRghg, Cpf: newCpf, fitbitId: newFitbitId })
        .then(response => {
          setPatients(patients.concat(response))
          setNewPhone('')
          setNewEmail('')
          setNewHeight('')
          setNewWeight('')
          setNewRghg('')
          setNewCpf('')
        })
        .catch(() => alert('nao foi possivel adicionar o paciente'))
    } else {
      alert('Pessoa já adicionada')
    }
  }

  return(
    <div style={{ width: '250px' }}>
        <h1>Cadastro do Paciente</h1>

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
            <div className="form-group">
              <label htmlFor="emailInput">Email:</label>
              <input value={newEmail} onChange={event => setNewEmail(event.target.value)} className="form-control" id="emailInput"/>
            </div>
            <div className="form-group">
              <label htmlFor="heightInput">Altura:</label>
              <input value={newHeight} onChange={event => setNewHeight(event.target.value)} className="form-control" id="heightInput"/>
            </div>
            <div className="form-group">
              <label htmlFor="weightInput">Peso:</label>
              <input value={newWeight} onChange={event => setNewWeight(event.target.value)} className="form-control" id="weightInput"/>
            </div>
            <div className="form-group">
              <label htmlFor="rghgInput">RGHG:</label>
              <input value={newRghg} onChange={event => setNewRghg(event.target.value)} className="form-control" id="rghgInput"/>
            </div>
            <div className="form-group">
              <label htmlFor="cpfInput">CPF:</label>
              <input value={newCpf} onChange={event => setNewCpf(event.target.value)} className="form-control" id="cpfInput"/>
            </div>
            <div className="form-group">
              <label htmlFor="fitbitIdInput">ID Fitbit:</label>
              <input value={newFitbitId} onChange={event => setNewFitbitId(event.target.value)} className="form-control" id="fitbitIdInput"/>
            </div>
            <button type="submit" className="btn btn-primary">Adicionar</button>
          </form>
        </div>
    </div>
  )}

export default CadastroPaciente