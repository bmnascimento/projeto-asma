import React from 'react'
import PatientMenu from './PatientMenu'

const Pacientes = () => {
  const contentStyle = {
    padding: '1em',
    width: '100%',
  }

  return(
    <div style={contentStyle} className="bg-light">
      <header>
        <h1>Dashboard</h1>
      </header>
      <main>
        <PatientMenu />
      </main>
    </div>
  )
}

export default Pacientes
