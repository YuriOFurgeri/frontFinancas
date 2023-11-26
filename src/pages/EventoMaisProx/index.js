import React from 'react';
import moment from 'moment';


function EventoMaisProximo({ eventoMaisProximo , toggleElementos /*, corTexto, total*/}) {

  //const data = moment(eventoMaisProximo.start).format('DD/MM/YYYY');
  
 // const corTexto = eventoMaisProximo.valor > total ? 'text-danger' : 'text-success';

  return (
    
    <div className="container-fluid mt-5">
            

    <div className="row justify-content-center align-items-center">
      <div className="col-12 col-md-9 col-lg-8 mb-4">
        <div className="card cardgrande">
          <div className="card-content">  
            <div className="card-body d-flex align-items-center">
              <div>
                <i className="bi bi-plus-circle-fill h1 text-primary iconegrande"   style={{ cursor: 'pointer' }}
href="" onClick={toggleElementos}></i>
              </div>
              <div className="text-center flex-grow-1">
              <h3 className={`text-primary textogrande`}>
                  {eventoMaisProximo ? eventoMaisProximo.title : 'Nenhuma Meta Adicionada'}
                </h3>
                <span className="text-muted textomedio min-width-100">
                  {eventoMaisProximo ? <div>Valor: R${eventoMaisProximo.valor}<br/> Data: {moment(eventoMaisProximo.start).format('DD/MM/YYYY')} </div> : 'Clique para adicionar uma meta'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    
  );
}

export default EventoMaisProximo;
