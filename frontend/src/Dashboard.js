import React from 'react'
import { Switch, Route, NavLink, Redirect } from 'react-router-dom'
import ListaPacientes from './Pacientes/ListaPacientes'
import PerfilPaciente from './Pacientes/PerfilPaciente'
import ListaUsuarios from './ListaUsuarios'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const Dashboard = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('usuarioLogado')
    setUser(null)
  }

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Logado como {user.rghg} <Button variant="dark" onClick={logout}>Logout</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-sm-3 col-md-2 bg-light py-3 border-right">
            <nav className="nav nav-pills flex-column">
              <NavLink className="nav-item nav-link" to="/pacientes">Pacientes</NavLink>
              <NavLink className="nav-item nav-link" to="/usuarios">Usuários</NavLink>
            </nav>
          </div>

          <main className="col-sm-9 col-md-10 bg-white p-4">
            <Switch>
              <Route path="/pacientes/:id">
                <PerfilPaciente />
              </Route>
              <Route path="/pacientes">
                <ListaPacientes />
              </Route>
              <Route path="/usuarios">
                <ListaUsuarios />
              </Route>
              <Route path="/">
                <Redirect to="/pacientes"/>
              </Route>
            </Switch>
          </main>
        </div>
      </main>
    </>
  )
}

export default Dashboard