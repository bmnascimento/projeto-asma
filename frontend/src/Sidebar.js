import React from 'react'

const Sidebar = () => {
  return(
    <nav id="sidebar" className="bg-dark text-white">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a className="nav-link active" href="#">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar

