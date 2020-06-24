import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import CadastroSintomasSemanal from './CadastroSintomasSemanal'

const ControleClinico = ({ id, lista }) => {
  return (
    <div className="border-right border-bottom border-left p-3">
      <h4>Controle clínico</h4>
      <Accordion className="mb-3">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Novo questionário
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <CadastroSintomasSemanal id={id} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      {lista.length > 0
        ?
        <UltimaResposta resposta={lista[0]} />
        :
        <p>O questionário não foi respondido nenhuma vez.</p>
      }
    </div>
  )
}

function UltimaResposta({ resposta }) {
  const alternativas = {
    freqAcordou: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'],
    intensidadeSintomas: ['Sem sintomas', 'Sintomas muito leves', 'Sintomas leves', 'Sintomas moderados', 'Sintomas um tanto graves', 'Sintomas graves', 'Sintomas muito graves'],
    chiadolimitacao: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'],
    freqFaltaDeAr: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'],
    freqChiado: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'],
    freqBombinha: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'],
    porcentagemPrevisto: ['Nunca', 'Quase nunca', 'Poucas vezes', 'Várias vezes', 'Muitas vezes', 'Muitíssimas vezes', 'Incapaz de dormir devido a asma'],
  }
  return (
    <ol>
      <li>
        Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite?
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.intensidadeSintomas.map((alternativa, key) =>
            <li key={key}>
              {resposta.intensidadeSintomas === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br />
      <li>
        Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.chiadolimitacao.map((alternativa, key) =>
            <li key={key}>
              {resposta.chiadolimitacao === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br /><li>
        De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.chiadolimitacao.map((alternativa, key) =>
            <li key={key}>
              {resposta.chiadolimitacao === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br /><li>
        De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.freqFaltaDeAr.map((alternativa, key) =>
            <li key={key}>
              {resposta.freqFaltaDeAr === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br /><li>
        De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado?
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.freqChiado.map((alternativa, key) =>
            <li key={key}>
              {resposta.freqChiado === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br /><li>
        Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.freqBombinha.map((alternativa, key) =>
            <li key={key}>
              {resposta.freqBombinha === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br /><li>
        VEF1 pré broncodilatador ______    VEF1 previsto ______    VEF1 % previsto
          <ol start="0" style={{ columns: 2 }}>
          {alternativas.porcentagemPrevisto.map((alternativa, key) =>
            <li key={key}>
              {resposta.porcentagemPrevisto === key
                ?
                <strong>{alternativa}</strong>
                :
                alternativa
              }
            </li>
          )}
        </ol>
      </li>
      <br />
    </ol>
  )
}

export default ControleClinico
