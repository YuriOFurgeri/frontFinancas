import React from 'react';
import './styles.css';
const CardsTopo = ({total,ganhos,gastos}) => {
    return (
    <div>
        
<div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card cardgrande">
            <div className="card-content">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="media-body text-left">
                  <h3 className="textogrande">R$ {total}</h3>
                  <span className="text-muted textomedio">Valor total</span>
                </div>
                <div>
                <i className="bi bi-safe-fill h1 text-secondary iconegrande"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card cardgrande">
            <div className="card-content">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="media-body text-left">
                  <h3 className="text-success textogrande">R$ {ganhos}</h3>
                  <span className="text-muted textomedio">Ganhos</span>
                </div>
                <div>
                <i className="bi bi-graph-up-arrow text-success h1 iconegrande"></i>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card cardgrande">
            <div className="card-content">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="media-body text-left">
                  <h3 className="text-danger textogrande">R$ {gastos}</h3>
                  <span className="text-muted textomedio">Gastos</span>
                </div>
                <div>
              <i className="bi bi-graph-down-arrow text-danger h1 iconegrande"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
    );
}

export default CardsTopo;