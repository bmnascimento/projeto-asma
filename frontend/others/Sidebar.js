import React from 'react'

const Sidebar = () => {
  const sidebarStyle = {
    minWidth: '250px',
    padding: '1em',
  }

  return(
    <nav style={sidebarStyle} className="bg-dark text-white">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#home">Pacientes</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#link1">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#link2">Link</a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar

