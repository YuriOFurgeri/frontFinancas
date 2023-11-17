import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles.css';

const Navbar = () => {
    const navigate = useNavigate();




    return(
<div>
<div className="container-fluid">
<div className="container-fluid">
      <nav className="navbar fixed-top navbar-expand-lg bg-body-secondary navbar-height">
        <div className="container-fluid">
        <i className="bi bi-rocket text-danger"></i>
          <a className="navbar-brand" href="#" onClick={()=>[navigate("/")]}>FinançasApp</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#" >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="" onClick={()=>[navigate("/metas")]}>Metas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Detalhes</a>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">testUser</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
    </div>
        );
}

export default Navbar;