import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import userService from '../services/usuarios.js'

const CadastroUsuario = () => {
  const [newName, setNewName] = useState('')
  const [newRghg, setNewRghg] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newType, setNewType] = useState('')

  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()

    userService.create({ name: newName, rghg: newRghg, password: newPassword, type: newType })
      .then(response => {
        history.push('/usuarios')
      })
      .catch(() => alert('nao foi possivel adicionar o profissional'))

  }

  return (
    <div style={{ width: '300px' }}>
      <h2>Cadastro de Usuário</h2>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nameInput">Nome</label>
            <input value={newName} type="text" onChange={event => setNewName(event.target.value)} className="form-control" id="nameInput" />
          </div>
          <div className="form-group">
            <label htmlFor="rghgInput">RGHG</label>
            <input value={newRghg} type="text" onChange={event => setNewRghg(event.target.value)} className="form-control" id="rghgInput" />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Senha</label>
            <input value={newPassword} type="text" onChange={event => setNewPassword(event.target.value)} className="form-control" id="passwordInput" />
          </div>
          <div className="form-group">
            <label htmlFor="typeInput">Tipo</label>
            <select id="typeInput" name="tipo" value={newType} onChange={event => setNewType(event.target.value)} className="form-control">
              <option value="profissional">Profissional de Saúde</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Adicionar</button>
        </form>
      </div>
    </div>
  )
}

export default CadastroUsuario