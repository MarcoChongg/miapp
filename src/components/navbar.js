import React from 'react';
import{Link} from 'react-router-dom';

export const NavBar =  () => (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/inicio">Bienvenido</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/About Us">Nosotros</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/Contact Us">Contacto</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/Media">Media</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/Signin">Sign In</Link>
            </li>
          </div>
        </div>
      </nav>
    
)

//<>