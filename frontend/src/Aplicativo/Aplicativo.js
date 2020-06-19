import React, { useEffect, useState } from 'react'
import patientService from '../services/patients'
import { Switch, Route, NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Home from './Home'

const Aplicativo = ({ user, setUser }) => {
  const [dados, setDados] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setDados(await patientService.getData(user.id, new Date()))
    }
    fetchData()
  }, [user.id])

  const logout = () => {
    window.localStorage.removeItem('usuarioLogado')
    setUser(null)
  }

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark" expand="md">
          <Navbar.Brand>Aplicativo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item><NavLink className="nav-link" exact to="/">Home</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-item nav-link" to="/sintomas">Sintomas</NavLink></Nav.Item>
              <Nav.Item><NavLink className="nav-item nav-link" to="/atividades">Atividades</NavLink></Nav.Item>
            </Nav>
            <Navbar.Text className="ml-auto">
              Logado como {user.name} <Button variant="dark" onClick={logout}>Logout</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main className="w-100 h-100">
        <Container>
          <div className="m-3 text-center">
            <Switch>
              <Route exact path="/">
                {dados !== undefined && <Home user={user} dados={dados} />}
              </Route>
              <Route path="/atividades">

              </Route>
              <Route path="/sintomas">

              </Route>
            </Switch>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Aplicativo