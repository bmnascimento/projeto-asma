import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usuarioService from './services/usuarios.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ListaUsuarios = () => {
  const [ usuarios, setUsuarios ] = useState(undefined) 
  const [ newEmail, setNewEmail ] = useState('')
  const [ newPassword, setNewPassword ] = useState('')

  useEffect(() => {
    usuarioService.getAll().then(response => setUsuarios(response))
  }, [])
  
  const handleSubmit = event => {
    event.preventDefault()

    const usuarioEncontrado = usuarios.find(usuario => usuario.name === newEmail)
    if (usuarioEncontrado === undefined) {
      usuarioService.create({ name: newEmail, phone: newPassword })
        .then(response => {
          setUsuarios(usuarios.concat(response))
          setNewPassword('')
          setNewEmail('')
        })
        .catch(() => alert('nao foi possivel adicionar paciente'))
    } else {
      alert('Pessoa já adicionada')
    }
  }

  return(
    <div style={{ width: '250px' }}>
        <h1>Usuários</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" value={newEmail} onChange={event => setNewEmail(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Senha" value={newPassword} onChange={event => setNewPassword(event.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary">Adicionar</Button>
        </Form>

        {usuarios ?
          <div className="list-group my-3">
          {usuarios.map(usuario => 
            <div
              key={usuario.id}
              className="list-group-item list-group-item-action"
            >
                {usuario.email}
            </div>
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

export default ListaUsuarios