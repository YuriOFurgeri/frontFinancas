import React from "react";
import "./styles.css";

const MetasSimps = () => {

  
    return (
<div className="container-fluid mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-9 col-lg-8 mb-4">
          <div className="card cardgrande">
            <div className="card-content">  
              <div className="card-body d-flex align-items-center">
                <div>
                  <i className="bi bi-plus-circle-fill h1 text-primary iconegrande"></i>
                </div>
                <div className="text-center flex-grow-1">
                  <h3 className="text-primary textogrande">Nenhuma Meta Adicionada</h3>
                  <span className="text-muted textomedio">clique para adicionar uma meta</span>
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