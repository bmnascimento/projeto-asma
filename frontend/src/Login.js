import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import loginService from './services/login'

const Login = ({ setUser }) => {
  const [alerta, setAlerta] = useState(null)

  function alertar(mensagem) {
    setAlerta(mensagem)
    setTimeout(() => setAlerta(null), 3000)
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
          {alerta &&
            <Alert variant={'danger'} className={'mt-3'} >
              {alerta}
            </Alert>
          }
          <Row className="justify-content-center">
            <Col className="col-md-5 col-lg-4 p-3 m-4 border">
              <LoginForm setUser={setUser} alertar={alertar} />
            </Col>
          </Row>
        </Container>
      </main>
    </>
  )
}

const LoginForm = ({ setUser, alertar }) => {
  const [rghg, setRGHG] = useState('')
  const [password, setPassword] = useState('')
  const [lembrarme, setLembrarme] = useState(false)
  const [carregando, setCarregando] = useState(false)

  const history = useHistory()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      setCarregando(true)

      const user = await loginService.login({
        rghg,
        password
      })

      if (lembrarme)
        window.localStorage.setItem('usuarioLogado', JSON.stringify(user))

      setUser(user)
      setCarregando(false)
      history.push('/')

    } catch (exception) {
      setCarregando(false)
      alertar('Usuário ou senha errados')
    }
  }

  return (
    <Form onSubmit={handleSubmit} >
      <Form.Group controlId="RGHG">
        <Form.Label>RGHC</Form.Label>
        <Form.Control type="text" placeholder="RGHG" value={rghg} onChange={({ target }) => setRGHG(target.value)} />
      </Form.Group>

      <Form.Group controlId="Password">
        <Form.Label>Senha</Form.Label>
        <Form.Control type="password" placeholder="Senha" value={password} onChange={({ target }) => setPassword(target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Lembrar-me" checked={lembrarme} onChange={({ target }) => setLembrarme(target.checked)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        {carregando ? <Spinner animation="border" role="status" size="sm" /> : 'Entrar'}
      </Button>

    </Form>
  )
}

export default Login