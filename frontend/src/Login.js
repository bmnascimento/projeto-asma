import React from 'react'
import {
    BrowserRouter as Router
  } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
  return (
    <Router>
      <header className="navbar navbar-dark bg-dark">
        <h1 className="navbar-brand">Login</h1>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-9 col-md-12 bg-light py-5 border">
          <Form className="col-sm-3 col-md-3 offset-sm-4 bg-light py-3 border">
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="email" placeholder="Nome" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Senha" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Lembrar-me" />
            
          </Form.Group>
          <Button className = "offset-sm-2" variant="info" type="Entrar">
            Registrar
          </Button>
          <Button className = "offset-sm-1" variant="primary" type="Entrar">
            Entrar
          </Button>
          </Form>
          </div>
         
        </div>
      </div>
      <footer className="container-fluid text-center bg-dark text-muted p-3">
        O código desse site está disponível no <a href="https://github.com/bmnascimento/projeto-asma">GitHub</a>
      </footer>
    </Router>
  )
}

export default Login