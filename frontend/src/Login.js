import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Spinner from 'react-bootstrap/Spinner'

import loginService from './services/login'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [lembrarme, setLembrarme] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      setCarregando(true)

      const user = await loginService.login({
        email,
        password
      })
      
      if (lembrarme)
        window.localStorage.setItem('usuarioLogado', JSON.stringify(user))

      setUser(user)
      setCarregando(false)
      history.push('/')

    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Login</Navbar.Brand>
        </Navbar>
      </header>
      <main className="bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col className="col-md-5 col-lg-4 p-3 m-4 border">
              <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type="password" placeholder="Senha" value={password} onChange={({ target }) => setPassword(target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Lembrar-me" checked={lembrarme} onChange={({ target }) => setLembrarme(target.checked)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                  { carregando ? <Spinner animation="border" role="status" size="sm"/> : 'Entrar' }
                </Button>
                
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

export default Login