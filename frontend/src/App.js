import React, { useState } from 'react'
import {
  HashRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard/Dashboard'

const App = () => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('usuarioLogado')))

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/">
          {user ? <Dashboard user={user} setUser={setUser} /> : <Redirect to="/login" />}
        </Route>
      </Switch>
      <footer className="text-center bg-dark text-muted p-3 mt-auto">
        O código desse site está disponível no <a href="https://github.com/bmnascimento/projeto-asma">GitHub</a>
      </footer>
    </Router>
  )
}

export default App