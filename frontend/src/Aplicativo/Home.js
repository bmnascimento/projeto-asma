import React from 'react'

const Home = ({ user, dados }) => {
  const minutosAtividade = dados.summary.fairlyActiveMinutes + dados.summary.veryActiveMinutes

  return (
    <>
    <h2>Bem-vindo(a), {user.name}</h2>
    <p>Hoje você fez {minutosAtividade} minutos de atividade hoje.</p>
    <p>Sua meta é fazer {30} minutos de atividade por dia.</p>
    <p>Você já atingiu {minutosAtividade/30}% da sua meta hoje.</p>
    </>
  )
}

export default Home