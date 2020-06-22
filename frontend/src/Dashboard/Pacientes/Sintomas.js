import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import sintomasService from '../../services/sintomas.js'
import PerfilPaciente from '../../Pacientes/PerfilPaciente'

const Dados = ({ id }) => {
  const [linhas, setLinhas] = useState([])

  useEffect(() => {
    let promises = []
    const quantidadeLinhas = 5

    const date = new Date()
    for (let i = 0; i < quantidadeLinhas; i++) {
      promises.push(sintomasService.getAll(id, formatDate(date)))

      date.setDate(date.getDate() - 1)
    }

    Promise.all(promises)
      .then(responses => {
        const date = new Date()
        console.log(responses)

        for (let i = 0; i < quantidadeLinhas; i++) {
          const response = responses[i]
          console.log (responses[i].length !== 0)
          if (responses[i].length !== 0) {
            setLinhas(linhas => linhas.concat({
              data: formatDate(date),
              tosse: responses[i][0].tosse,
              faltaDeAr: responses[i][0].faltaDeAr,
              bombinha: responses[i][0].bombinha,
              acordar: responses[i][0].acordar
            }))
            console.log(responses[i][0].tosse)
            console.log(responses[i][0].faltaDeAr)
            console.log(responses[i][0].bombinha)
            console.log(responses[i][0].acordar)
          }

          date.setDate(date.getDate() - 1)

        }


      })

  }, [id])

  return (
    <div className="border-right border-bottom border-left p-3">
      <h4>Dados</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Data</th>
            <th>Teve tosse?</th>
            <th>Teve falta de ar?</th>
            <th>Usou a bombinha?</th>
            <th>Acordou de madrugada?</th>
          </tr>
        </thead>
        <tbody>
          {linhas.map(linha =>
            <tr key={linha.data}>
              <td>{linha.data}</td>
              <td>{linha.tosse && "Teve"}</td>
              <td>{linha.faltaDeAr && "Teve"}</td>
              <td>{linha.bombinha && "Teve"}</td>
              <td>{linha.acordar && "Teve"}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const formatDate = date => {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('-')
}

export default Dados