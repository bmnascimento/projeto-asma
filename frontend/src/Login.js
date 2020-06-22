import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Spinner from 'react-bootstrap/Spinner'
import ArrowLeft from './icons/arrow-left.svg'

import loginService from './services/login'

const Login = ({ setUser }) => {
  const [type, setType] = useState('escolha')

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
            {type === 'escolha'
              ? <><Button variant="primary" className="w-100" onClick={() => {setType('paciente')}} > Paciente </Button>
                  <Button variant="primary" className="w-100 mt-3" onClick={() => {setType('profissional')}}> Profissional de Saúde </Button></>
              : <><button className="mb-1 btn btn-link p-0" onClick={() => setType('escolha')} ><img src={ArrowLeft} alt="Return"/></button>
                  <h5 className="text-center" display="inline">{type === 'paciente' ? 'Paciente' : 'Profissional de Saúde'}</h5>
                  <LoginForm setUser={setUser} type={type} /></>
            }
          </Col>
        </Row>
      </Container>
    </main>
    </>
  )
}

const LoginForm = ({ setUser, type }) => {
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
        password,
        type
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
    <Form onSubmit={handleSubmit} >
      <Form.Group controlId="RGHG">
        <Form.Label>RGHG</Form.Label>
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
        { carregando ? <Spinner animation="border" role="status" size="sm"/> : 'Entrar' }
      </Button>
      
    </Form>
  )
}

export default Login