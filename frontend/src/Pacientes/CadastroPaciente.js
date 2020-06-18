import React, { useState } from 'react'
import patientService from '../services/patients.js'

const CadastroPaciente = () => {
  const [ patients, setPatients ] = useState(undefined) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newHeight, setNewHeight ] = useState('')
  const [ newWeight, setNewWeight ] = useState('')
  const [ newRghg, setNewRghg ] = useState('')
  const [ newCpf, setNewCpf ] = useState('')
  const [ newData, setNewData ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')
  
  const handleSubmit = event => {
    event.preventDefault()

    const foundPatient = patients.find(patient => patient.name === newName)
    if (foundPatient === undefined) {
      patientService.create({ name: newName, phone: newPhone, height: newHeight, weight: newWeight, rghg: newRghg, cpf: newCpf, birthDate: newData, password: newPassword })
        .then(response => {
          setPatients(patients.concat(response))
          setNewPhone('')
          setNewHeight('')
          setNewWeight('')
          setNewRghg('')
          setNewCpf('')
          setNewData('')
        })
        .catch(() => alert('nao foi possivel adicionar o paciente'))
    } else {
      alert('Pessoa já adicionada')
    }
  }

  return(
    <div style={{ width: '300px' }}>
      <h2>Cadastrar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">Nome</label>
          <input value={newName} type="text" onChange={event => setNewName(event.target.value)} className="form-control" id="nameInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="weightInput">Peso (kg)</label>
          <input value={newWeight} type="number" min="1" onChange={event => setNewWeight(event.target.value)} className="form-control" id="weightInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="heightInput">Altura (cm)</label>
          <input value={newHeight} type="number" min="1" onChange={event => setNewHeight(event.target.value)} className="form-control" id="heightInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput">Telefone</label>
          <input value={newPhone} type="tel" onChange={event => setNewPhone(event.target.value)} className="form-control" id="phoneInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="rghgInput">RGHG</label>
          <input value={newRghg} type="text" onChange={event => setNewRghg(event.target.value)} className="form-control" id="rghgInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="cpfInput">CPF</label>
          <input value={newCpf} type="text" onChange={event => setNewCpf(event.target.value)} className="form-control" id="cpfInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="dataInput">Data de Nascimento</label>
          <input value={newData} type="date" onChange={event => setNewData(event.target.value)} className="form-control" id="dataInput"/>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Senha</label>
          <input value={newPassword} type="text" onChange={event => setNewPassword(event.target.value)} className="form-control" id="passwordInput"/>
        </div>
        <button type="submit" className="btn btn-primary">Adicionar</button>
      </form>
    </div>
  )}

export default CadastroPaciente