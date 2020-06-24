import React, { useState } from 'react'
import sintomasSemanalService from '../../services/sintomasSemanal.js'

const CadastroSintomasSemanal = ({ id }) => {
  const [newFreqAcordou, setNewFreqAcordou] = useState('0')
  const [newIntensidadeSintomas, setNewIntensidadeSintomas] = useState('0')
  const [newChiadolimitacao, setNewChiadolimitacao] = useState('0')
  const [newFreqFaltaDeAr, setNewFreqFaltaDeAr] = useState('0')
  const [newFreqChiado, setNewFreqChiado] = useState('0')
  const [newFreqBombinha, setNewFreqBombinha] = useState('0')
  const [newPorcentagemPrevisto, setNewPorcentagemPrevisto] = useState('0')

  const handleSubmit = event => {
    event.preventDefault()

    const questionario = {
      freqAcordou: newFreqAcordou,
      intensidadeSintomas: newIntensidadeSintomas,
      chiadolimitacao: newChiadolimitacao,
      freqFaltaDeAr: newFreqFaltaDeAr,
      freqChiado: newFreqChiado,
      freqBombinha: newFreqBombinha,
      porcentagemPrevisto: newPorcentagemPrevisto
    }

    sintomasSemanalService.create(id, questionario)
      .then(() => {
        alert('Formulário de sintomas enviado!')
      })
      .catch(() => alert('Não foi possivel enviar o formulário de sintomas'))
  }

  return (
    <div>
      <h4>Questionário de Controle da Asma (ACQ)</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput"> 1) Em média, durante os últimos sete dias, o quão frequentemente você se acordou por causa de sua asma, durante a noite? </label><br />
          <select value={newFreqAcordou} onChange={event => setNewFreqAcordou(event.target.value)}>
            <option value="0">Nunca</option>
            <option value="1">Quase Nunca</option>
            <option value="2">Poucas Vezes</option>
            <option value="3">Varias Vezes</option>
            <option value="4">Muitas Vezes</option>
            <option value="5">Muitissimas Vezes</option>
            <option value="6">Incapaz de dormir devido a asma</option>
          </select>
          <hr />
          <label htmlFor="nameInput"> 2) Em média, durante os últimos sete dias, o quão ruins foram os seus sintomas da asma, quando você acordou pela manhã?</label><br />
          <select value={newIntensidadeSintomas} onChange={event => setNewIntensidadeSintomas(event.target.value)}>
            <option value="0">Sem sintomas</option>
            <option value="1">Sintomas muito leves</option>
            <option value="2">Sintomas leves</option>
            <option value="3">Sintomas moderados</option>
            <option value="4">Sintomas um tanto graves</option>
            <option value="5">Sintomas graves</option>
            <option value="6">Sintomas muito graves</option>
          </select>
          <hr />
          <label htmlFor="nameInput"> 3)  De um modo geral, durante os últimos sete dias, o quão limitado você tem estado em suas atividades por causa de sua asma?</label><br />
          <select value={newChiadolimitacao} onChange={event => setNewChiadolimitacao(event.target.value)}>
            <option value="0">Nada limitado</option>
            <option value="1">Muito pouco limitado</option>
            <option value="2">Pouco limitado</option>
            <option value="3">Moderadamente limitado</option>
            <option value="4">Muito limitado</option>
            <option value="5">Exageradamente limitado</option>
            <option value="6">Totalmente limitado</option>
          </select>
          <hr />
          <label htmlFor="nameInput"> 4)  De um modo geral, durante os últimos sete dias, o quanto de falta de ar você teve por causa de sua asma?</label><br />
          <select value={newFreqFaltaDeAr} onChange={event => setNewFreqFaltaDeAr(event.target.value)}>
            <option value="0">Nenhuma</option>
            <option value="1">Muito pouca</option>
            <option value="2">Alguma</option>
            <option value="3">Moderada</option>
            <option value="4">Bastante</option>
            <option value="5">Muita</option>
            <option value="6">Muitíssima</option>
          </select>
          <hr />
          <label htmlFor="nameInput"> 5)  De um modo geral, durante os últimos sete dias, quanto tempo você teve chiado?</label><br />
          <select value={newFreqChiado} onChange={event => setNewFreqChiado(event.target.value)}>
            <option value="0">Nunca</option>
            <option value="1">Quase nunca</option>
            <option value="2">Pouco tempo</option>
            <option value="3">Algum tempo</option>
            <option value="4">Bastante tempo</option>
            <option value="5">Quase sempre</option>
            <option value="6">Sempre</option>
          </select>
          <hr />
          <label htmlFor="nameInput"> 6)  Em média, durante os últimos sete dias, quantos jatos de broncodilatador de resgate (Sabutamol, Fenoterol, etc) você usou por dia?</label><br />
          <select value={newFreqBombinha} onChange={event => setNewFreqBombinha(event.target.value)}>
            <option value="0">Nenhum</option>
            <option value="1">1-2 jatos na maior parte dos dias </option>
            <option value="2">3-4 jatos na maior parte dos dias </option>
            <option value="3">5-8 jatos na maior parte dos dias </option>
            <option value="4">9-12 jatos na maior parte dos dias </option>
            <option value="5"> 3-16 jatos na maior parte dos dias </option>
            <option value="6">Mais de 16 jatos por dia</option>
          </select>
          <hr />
          <label htmlFor="nameInput"> 7)  . VEF1 pré broncodilatador ______ VEF1 previsto ______ VEF1 % previsto</label><br />
          <select value={newPorcentagemPrevisto} onChange={event => setNewPorcentagemPrevisto(event.target.value)}>
            <option value="0">mais que 95% do previsto</option>
            <option value="1">95-90% do previsto </option>
            <option value="2">89-80% do previsto </option>
            <option value="3">79-70% do previsto </option>
            <option value="4">69-60% do previsto </option>
            <option value="5">59-50% do previsto </option>
            <option value="6">menos que 50% do previsto </option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  )
}

export default CadastroSintomasSemanal
