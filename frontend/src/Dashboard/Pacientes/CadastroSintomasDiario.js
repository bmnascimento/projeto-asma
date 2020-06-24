import React, { useState } from 'react'
import sintomasService from '../../services/sintomas.js'

const CadastroSintomasDiario = ({ id }) => {
  const [newPicoFluxo, setNewPicoFluxo] = useState()
  const [newTosse, setNewTosse] = useState('')
  const [newChiado, setNewChiado] = useState('')
  const [newFaltaDeAr, setNewFaltaDeAr] = useState('')
  const [newAcordar, setNewAcordar] = useState('')
  const [newBombinha, setNewBombinha] = useState('')
  const [newDetalhes, setNewDetalhes] = useState('')
  const [date] = useState(new Date())

  const handleSubmit = event => {
    event.preventDefault()

    sintomasService.create(id, {
      dia: date,
      picoDeFluxo: newPicoFluxo || null,
      tosse: newTosse || false,
      chiado: newChiado || false,
      faltaDeAr: newFaltaDeAr || false,
      acordar: newAcordar || false,
      bombinha: newBombinha || false,
      detalhes: newDetalhes,
    })
      .then(() => {
        alert('Formulário de sintomas enviado!')
      })
      .catch(() => alert('Não foi possivel enviar o formulário de sintomas'))
  }

  return (
    <div>
      <h2>Formulário Diário de Sintomas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dateInput">Data</label>
          <input disabled value={date} type="text" className="form-control" id="dateInput" />
        </div>
        <div className="form-group">
          <label htmlFor="picoInput">Pico de Fluxo</label>
          <input value={newPicoFluxo} type="text" onChange={event => setNewPicoFluxo(event.target.value)} className="form-control" id="picoInput" />
        </div>
        <div className="form-group">
          <label htmlFor="tosseInput">Tosse</label>
          <input value={newTosse} type="checkbox" onClick={event => setNewTosse(!newTosse)} className="form-control" id="tosseInput" />
        </div>
        <div className="form-group">
          <label htmlFor="chiadoInput">Chiado</label>
          <input value={newChiado} type="checkbox" onClick={event => setNewChiado(!newChiado)} className="form-control" id="chiadoInput" />
        </div>
        <div className="form-group">
          <label htmlFor="arInput">Falta de Ar</label>
          <input value={newFaltaDeAr} type="checkbox" onClick={event => setNewFaltaDeAr(!newFaltaDeAr)} className="form-control" id="arInput" />
        </div>
        <div className="form-group">
          <label htmlFor="acordarInput">Acordar</label>
          <input value={newAcordar} type="checkbox" onClick={event => setNewAcordar(!newAcordar)} className="form-control" id="acordarInput" />
        </div>
        <div className="form-group">
          <label htmlFor="bombinhaInput">Bombinha</label>
          <input value={newBombinha} type="checkbox" onClick={event => setNewBombinha(!newBombinha)} className="form-control" id="bombinhaInput" />
        </div>
        <div className="form-group">
          <label htmlFor="detalhesInput">Detalhes</label>
          <input value={newDetalhes} type="textarea" onChange={event => setNewDetalhes(event.target.value)} className="form-control" id="detalhesInput" />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  )
}

export default CadastroSintomasDiario
