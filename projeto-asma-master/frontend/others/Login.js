import React, { useState } from 'react'

const Login = () => {
  const [ paciente, setPaciente ] = useState('')
  const [ number, setNumber ] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log(username, password)
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Nome de usuário</label>
        <input type="text" value={username} onChange={event => setUsername(event.target.value)}/>
        <label>Senha</label>
        <input type="password" value={password} onChange={event => setPassword(event.target.value)}/> 
        <button type="button" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  )
}

export default Login
