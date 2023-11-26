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
          <a className="navbar-brand textogrande" href="#" onClick={()=>[navigate("/movimentacoes")]}>FinançasApp</a>
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active textomedio" aria-current="page" href="#"onClick={()=>[navigate("/movimentacoes")]} >Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active textomedio" aria-current="page" href="" onClick={()=>[navigate("/metas")]}>Metas</a>
              </li>
              <li className="nav-item">
                <a className="nav-link textomedio" href="https://github.com/YuriOFurgeri/tcc-financas">Detalhes</a>
              </li>
            </ul>
          </div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link textomedio" href="#" onClick={()=>[navigate("/perfil")]}>Perfil</a>
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