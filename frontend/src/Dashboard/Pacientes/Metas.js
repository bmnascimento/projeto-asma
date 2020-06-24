import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

import patientService from './../../services/patients'

const Metas = ({ id, linhas, metas }) => {
  const [metaPassos, setMetaPassos] = useState('')
  const [metaTempo, setMetaTempo] = useState('')
  const [metasAtuais, setMetasAtuais] = useState(metas ? metas : { passos: 0, tempo: 0 })

  const handleSubmit = async event => {
    event.preventDefault()
    const novasMetas = {
      passos: metaPassos,
      tempo: metaTempo,
    }
    const response = await patientService.update(id, { metas: novasMetas })
    setMetasAtuais(response.metas)
  }

  return (
    <div className="border-right border-bottom border-left p-3">
      <h4>Metas</h4>
      <h5>A meta atual é de {metasAtuais.passos && `${metasAtuais.passos} passos`}{(metasAtuais.passos && metasAtuais.tempo) && ' e '}{metasAtuais.tempo && `${metasAtuais.tempo} minutos de atividade`} por dia.</h5>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Nova meta
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              <Form onSubmit={handleSubmit}>
                <Form.Row>

                  <Form.Group as={Col} >
                    <Form.Label>Número de passos</Form.Label>
                    <Form.Control placeholder="Passos" onChange={({ target }) => setMetaPassos(target.value)} />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Tempo de atividade</Form.Label>
                    <Form.Control placeholder="Tempo" onChange={({ target }) => setMetaTempo(target.value)} />
                  </Form.Group>

                </Form.Row>

                <Button variant="primary" type="submit">
                  Nova meta
                </Button>
              </Form>

            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      {linhas.map(linha =>
        <div className="mt-3">
          <strong>Desempenho em {linha.data}</strong>
          <ProgressBar animated now={linha.numPassos / metasAtuais.passos * 100} />
          <div>O paciente atingiu {Math.floor(linha.numPassos / metasAtuais.passos * 100)}% da meta do dia.</div>
          <div>O paciente andou {linha.numPassos} passos.</div>
        </div>
      )
      }
    </div>
  )
}

export default Metas
