import React from 'react'
import Table from 'react-bootstrap/Table'
const Dados = () => {
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
          <tr>
            <td>25/04</td>
            <td>1500</td>
            <td>O,5</td>
            <td>10</td>
          </tr>
          <tr>
            <td>26/04</td>
            <td>9000</td>
            <td>2</td>
            <td>9</td>
          </tr>
          <tr>
            <td>27/04</td>
            <td> 10000</td>
            <td>8</td>
            <td>7</td>
          </tr>
        </tbody>
      </Table>
    </div>
    
  )
}

export default Dados
