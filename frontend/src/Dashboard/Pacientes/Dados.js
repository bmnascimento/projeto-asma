import React from 'react'
import Table from 'react-bootstrap/Table'

const Dados = ({ linhas }) => {
  return (
    <div className="border-right border-bottom border-left p-3">
      <h4>Dados</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>nº de passos</th>
            <th>Horas ativas</th>
            <th>Horas Sedentarias</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map(linha => 
            <tr key={linha.data}>
              <td>{linha.data}</td>
              <td>{linha.numPassos}</td>
              <td>{linha.minutosAtivos/60}</td>
              <td>{linha.minutosSedentarios/60}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Dados
