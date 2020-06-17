import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import patientDataService from '../services/dataPatients.js'

const Dados = ({ fitbitId, accessToken }) => {
  const [ linhas, setLinhas ] = useState([])

  useEffect(() => {
    let promises = []
    const quantidadeLinhas = 5

    const date = new Date()
    for (let i = 0; i < quantidadeLinhas; i++) {
      promises.push(patientDataService.getData(fitbitId, formatDate(date), accessToken))
      date.setDate(date.getDate()-1)
    }

    Promise.all(promises)
      .then(responses => {
        const date = new Date()

        for (let i = 0; i < quantidadeLinhas; i++) {
          const response = responses[i]

          setLinhas(linhas => linhas.concat({
            data: formatDate(date),
            numPassos: response.summary.steps,
            minutosAtivos: response.summary.fairlyActiveMinutes + response.summary.lightlyActiveMinutes + response.summary.veryActiveMinutes,
            minutosSedentarios: response.summary.sedentaryMinutes
          }))
          date.setDate(date.getDate()-1)
        }
      })

  }, [fitbitId, accessToken])

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
