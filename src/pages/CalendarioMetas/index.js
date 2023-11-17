import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import ptBR from 'date-fns/locale/pt-BR'; // Importe o idioma português
import 'moment/locale/pt-br';
import './styles.css';
import Navbar from '../MainPage/Navbar';

moment.locale('pt-br');
//configurar o calendário para português


const localizer = momentLocalizer(moment);

const CalendarioMetas = () => {
  const [eventos, setEventos] = useState([]); // Estado para armazenar eventos
  const [eventoMaisProximo, setEventoMaisProximo] = useState(null); // Estado para rastrear o evento mais próximo
  const [mostrarCalendario, setMostrarCalendario] = useState(false); // Estado para controlar a visibilidade

  
  const customMessages = {
    today: 'Hoje', // Altere o texto do botão "Today" para "Hoje"
    previous: 'Anterior', // Altere o texto do botão "Previous" para "Anterior"
    next: 'Próximo', // Altere o texto do botão "Next" para "Próximo"
    month: 'Mês', // Altere o texto do botão "Month" para "Mês"
    week: 'Semana', // Altere o texto do botão "Week" para "Semana"
    day: 'Dia', // Altere o texto do botão "Day" para "Dia"
    agenda: 'Agenda', // Altere o texto do botão "Agenda" para "Agenda"
  };

  const toggleElementos = () => {
    setMostrarCalendario(!mostrarCalendario);
  };

 


  const adicionarEvento = (novoEvento) => {
    setEventos([...eventos, novoEvento]);
  };

  useEffect(() => {
    const dataAtual = new Date();
    const eventoProximo = eventos.reduce((eventoProximo, eventoAtual) => {
      if (!eventoProximo || eventoAtual.start < eventoProximo.start) {
        return eventoAtual;
      }
      return eventoProximo;
    }, null);

    // Atualize o estado do eventoMaisProximo com o evento encontrado
    setEventoMaisProximo(eventoProximo);
  }, [eventos]);

  function EventoForm({ onAdicionarEvento }) {
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      // Crie um novo evento com os dados do formulário
      const novoEvento = {
        title: titulo,
        start: new Date(data),
        end: new Date(data),
        valor: parseFloat(valor), // Converte o valor para um número
      };

      // Chame a função de callback para adicionar o evento ao calendário
      onAdicionarEvento(novoEvento);

      // Limpe os campos do formulário
      setTitulo('');
      setData('');
      setValor('');
    };

    

    return (
        <div>
        <Navbar />

        <div className="container-fluid mt-3">
        <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-9 col-lg-10 mb-4 formlargo">
        <div className="card">
        <form onSubmit={handleSubmit}>
        <div className="text-center flex-grow-1">
        <span className="text-muted">Adicione aqui suas Metas</span>
        </div>
        <div className="card-content">

        <div class="input-group mb-3">               
        <span class="input-group-text">Descrição da Meta:</span>
        <input type="text" value={titulo} class="form-control" onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        
        <div class="input-group mb-3">               
        <span class="input-group-text">Valor da Meta:</span>
        <input class="form-control" type="number" value={valor} onChange={(e) => setValor(e.target.value)} required />

        <span class="input-group-text">Data da Meta:</span>
        <input class="form-control" type="datetime-local" value={data} onChange={(e) => setData(e.target.value)} required />
        </div>

        <div className="text-center flex-grow-1">
        <button class="btn btn-primary mb-3" type="submit"><h6>Adicionar Evento</h6></button>
        </div>
        </div>
      </form>
        </div>
        </div>
        </div>
        </div>

        </div>

      
    );
  }

  return (
    <div class="container mt-5 mb-5">      
      
      
      <button class="btn btn-primary btn-circle btn-xl" onClick={toggleElementos}><i class="bi bi-plus-lg"></i></button>

      <div style={{ display: 'flex', flexDirection: 'column' }}>

      {mostrarCalendario ? (
        <div style={{ height: 500}}>
       
       <h1 className="text-center">Calendário de Metas</h1>
       <div className="card">


      <EventoForm onAdicionarEvento={adicionarEvento} />

      <div style={{ position: 'relative', top: '30px', height: 500}}>
        <Calendar
        
          messages={customMessages} 
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ backgroundColor: 'white' }}
        />
      </div>
   </div>
    </div>
      ):(
         //<EventoMaisProximo eventoMaisProximo={eventoMaisProximo} />
            <div className="container-fluid mt-5">    
            AAAAAAAAAAA
            </div>        
      )}
      {/* Renderize o novo componente EventoMaisProximo aqui e passe o eventoMaisProximo como uma prop */}

    </div>
    </div>
  );
}

export default CalendarioMetas;
