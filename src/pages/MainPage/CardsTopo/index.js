import React from 'react';

const CardsTopo = ({total,ganhos,gastos}) => {
    return (
    <div>
        
<div className="container mt-5">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-content">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="media-body text-left">
                  <h3>R$ {total}</h3>
                  <span className="text-muted">Valor total</span>
                </div>
                <div>
                <i className="bi bi-safe-fill h1 text-secondary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-content">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="media-body text-left">
                  <h3 className="text-success">R$ {ganhos}</h3>
                  <span className="text-muted">Ganhos</span>
                </div>
                <div>
                <i className="bi bi-graph-up-arrow text-success h1"></i>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mb-4">
          <div className="card">
            <div className="card-content">
              <div className="card-body d-flex justify-content-between align-items-start">
                <div className="media-body text-left">
                  <h3 className="text-danger">R$ {gastos}</h3>
                  <span className="text-muted">Gastos</span>
                </div>
                <div>
              <i className="bi bi-graph-down-arrow text-danger h1"></i>
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