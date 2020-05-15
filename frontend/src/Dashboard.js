import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Pacientes from './Pacientes'
import Home from './Home'
import Ajuda from './Ajuda'

const Dashboard = () => {
  const dashStyle = {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
  }

  const sidebarStyle = {
    minWidth: '250px',
    padding: '1em',
  }

  return (
    <div style={dashStyle}>
      <Router>
        <nav style={sidebarStyle} className="bg-dark text-white">
          <div className="sidebar-header">
            <h3>Menu</h3>
          </div>
          <div className="nav nav-pills flex-column">
            <Link className="nav-item nav-link" to="/">Home</Link>
            <Link className="nav-item nav-link" to="/pacientes">Pacientes</Link>
            <Link className="nav-item nav-link" to="/ajuda">Ajuda</Link>
          </div>
        </nav>

        <Switch>
          <Route path="/pacientes">
            <Pacientes />
          </Route>
          <Route path="/ajuda">
            <Ajuda />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default Dashboard
