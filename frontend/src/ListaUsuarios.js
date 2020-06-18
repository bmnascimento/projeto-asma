import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usuarioService from './services/usuarios.js'
import Button from 'react-bootstrap/Button'

const ListaUsuarios = () => {
  const [ usuarios, setUsuarios ] = useState(undefined)

  useEffect(() => {
    usuarioService.getAll().then(response => setUsuarios(response))
  }, [])

  return(
    <div style={{ width: '300px' }}>
        <Link to="/usuarios/cadastro"><Button className="float-right mt-1">Novo</Button></Link>
        <h1>Usuários</h1>

        {usuarios ?
          <div className="list-group my-3">
          {usuarios.map(usuario => 
            <div
              key={usuario.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
                {usuario.name} - {usuario.rghg} {usuario.type === 'admin' && <span class="badge badge-primary badge-pill">Admin</span>}
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