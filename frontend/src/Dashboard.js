import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, NavLink
} from 'react-router-dom'

import ListaPacientes from './Pacientes/ListaPacientes'
import DadosPaciente from './Pacientes/DadosPaciente'
import Home from './Home'
import Ajuda from './Ajuda'

const Dashboard = () => {
  return (
    <Router>
      <header className="navbar navbar-dark bg-dark">
        <h1 className="navbar-brand">Dashboard</h1>
      </header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 bg-light py-3 border">
            <nav className="nav nav-pills flex-column">
              <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>
              <NavLink className="nav-item nav-link" to="/pacientes">Pacientes</NavLink>
              <NavLink className="nav-item nav-link" to="/FAQ">FAQ</NavLink>
              <NavLink className="nav-item nav-link" to="/ajuda">Ajuda</NavLink>
            </nav>
          </div>

          <main className="col-sm-9 col-md-10 bg-white p-4">
            <Switch>
              <Route path="/pacientes/:id">
                <DadosPaciente />
              </Route>
              <Route path="/pacientes">
                <ListaPacientes />
              </Route>
              <Route path="/ajuda">
                <Ajuda />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
      <footer className="container-fluid text-center bg-dark text-muted p-3">
        O código desse site está disponível no <a href="https://github.com/bmnascimento/projeto-asma">GitHub</a>
      </footer>
    </Router>
  )
}

export default Dashboard