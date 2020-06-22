import React from 'react'
import Table from 'react-bootstrap/Table'

const Dados = ({ linhas }) => {
  const formatMinutos = minutos => {
    if (minutos >= 60) {
      return(`${Math.floor(minutos/60)}h${String(minutos%60).padStart(2, '0')}m`)
    } else {
      return(`${String(minutos%60)}m`)
    }
  }

  console.log(linhas)
  return (
    <div className="border-right border-bottom border-left p-3">
      <h4>Dados</h4>
      <Table striped bordered hover style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Nº de passos</th>
            <th>Tempo atividade leve</th>
            <th>Tempo atividade moderada</th>
            <th>Tempo atividade intensa</th>
            <th>Tempo sedentário</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map(linha => 
            <tr key={linha.data}>
              <td>{linha.data}</td>
              <td>{linha.numPassos}</td>
              <td>{formatMinutos(linha.minutosLeves)}</td>
              <td>{formatMinutos(linha.minutosModerados)}</td>
              <td>{formatMinutos(linha.minutosIntensos)}</td>
              <td>{formatMinutos(linha.minutosSedentarios)}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Dados
