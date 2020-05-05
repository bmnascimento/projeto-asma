import React, { useState } from 'react'
import './Login.css'

const Login = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log(username, password)
  }

  return (
    <div className="Login">
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label>Nome de usuário</label>
          <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
          <label>Senha</label>
          <input type="password" value={password} onChange={event => setPassword(event.target.value)}/> 
          <input className="button" type="submit" value="Enviar"/>
        </form>
      </main>
    </div>
  )
}

export default Login
