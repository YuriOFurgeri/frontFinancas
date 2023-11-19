import React from 'react';
import CalendarioMetas from '../CalendarioMetas';

function EventoMaisProximo({ eventoMaisProximo }) {

  console.log("esta recebendo algo?");
  return (
    
    <div className="barra-inferior" style={{zIndex:1}}>
      <h2>Próximo Evento:</h2>
      {eventoMaisProximo ? (
        <div>
          <p>Título: {eventoMaisProximo.title}</p>
          <p>Valor: {eventoMaisProximo.valor}</p>
          <p>Início: {eventoMaisProximo.start.toLocaleString()}</p>
        </div>
      ) : (
        <p>Nenhum evento próximo</p>
      )}
    </div>
  );
}

export default EventoMaisProximo;

