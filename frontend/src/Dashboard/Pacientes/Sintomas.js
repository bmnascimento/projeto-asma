import React from 'react'
import Table from 'react-bootstrap/Table'
import { IoIosCheckmark } from 'react-icons/io'

const Sintomas = ({ lista }) => {
  return (
    <div className="border-right border-bottom border-left p-3">
      <h4>Dados</h4>
      <Table striped bordered hover style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Data</th>
            <th>Pico de fluxo</th>
            <th>Teve tosse?</th>
            <th>Teve chiado?</th>
            <th>Teve falta de ar?</th>
            <th>Acordou de madrugada?</th>
            <th>Usou a bombinha?</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(linha => {
            const data = new Date(linha.dia)
            return (<tr key={linha.dia}>
              <td>{`${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`}</td>
              <td>{linha.picoDeFluxo}</td>
              <td>{linha.tosse && <IoIosCheckmark />}</td>
              <td>{linha.chiado && <IoIosCheckmark />}</td>
              <td>{linha.faltaDeAr && <IoIosCheckmark />}</td>
              <td>{linha.acordar && <IoIosCheckmark />}</td>
              <td>{linha.bombinha && <IoIosCheckmark />}</td>
              <td>{linha.detalhes}</td>
            </tr>)
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Sintomas