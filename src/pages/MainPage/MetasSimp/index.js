import React from "react";

const MetasSimps = () => {

  
    return (
<div className="container-fluid mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-9 col-lg-8 mb-4">
          <div className="card">
            <div className="card-content">
              <div className="card-body d-flex align-items-center">
                <div>
                  <i className="bi bi-plus-circle-fill h1 text-primary"></i>
                </div>
                <div className="text-center flex-grow-1">
                  <h3 className="text-primary">Nenhuma Meta Adicionada</h3>
                  <span className="text-muted">clique para adicionar uma meta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>    

    );
}

export default MetasSimps;