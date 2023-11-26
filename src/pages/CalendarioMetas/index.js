import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/pt-br';
import './styles.css';
import Navbar from '../MainPage/Navbar';
import EventoMaisProximo from '../EventoMaisProx';
import axios from 'axios';
import Header from './Header';


moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const CalendarioMetas = ({/*total*/}) => {
  const [eventos, setEventos] = useState([]);
  const [eventoMaisProximo, setEventoMaisProximo] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  
  //let corTexto = eventoMaisProximo.valor > total ? 'text-danger' : 'text-success';

  const handleExcluirEvento = async (eventoId) => {
    try {
      await axios.delete(`http://localhost:8080/eventos/${eventoId}`);
      const novosEventos = eventos.filter((evento) => evento.id !== eventoId);
      setEventos(novosEventos);
      console.log(`Evento ${eventoId} excluído com sucesso!`);
    } catch (error) {
      console.error(`Erro ao excluir evento ${eventoId}:`, error);
    }
  };



  const customMessages = {
    today: 'Hoje',
    previous: 'Anterior',
    next: 'Próximo',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
  };

  const toggleElementos = () => {
    setMostrarCalendario(!mostrarCalendario);
  };

  const adicionarEvento = async (novoEvento) => {

  await axios.post('http://localhost:8080/eventos', {
      userId: localStorage.getItem('userId'),
      title: novoEvento.title,
      start: novoEvento.start,
      end: novoEvento.end,
      valor: novoEvento.valor,
    });

    // Atualiza a lista de eventos após adicionar um novo
    buscarEventosNoBanco();
  };
  /*
  const adicionarEvento = async (novoEvento) => {
    try {
      const userId = localStorage.getItem('userId'); // Obtenha o userId do localStorage
      const response = await axios.post('http://localhost:8080/eventos', {
        userId: userId, // Inclua o userId na requisição
        title: novoEvento.title,
        start: novoEvento.start,
        end: novoEvento.end,
        valor: novoEvento.valor,
      });
      console.log('Evento adicionado com sucesso:', response.data);
      buscarEventosNoBanco();

      // Atualize o estado dos eventos (se necessário)
      setEventos([...eventos, novoEvento]);
    } catch (error) {
      console.error('Erro ao adicionar evento:', error);
    }
  };*/



    const buscarEventosNoBanco = async () => {
    try {
      const response = await axios.get('http://localhost:8080/eventos', {
        params: { userId: localStorage.getItem('userId') },
      });
      setEventos(response.data);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    }
  };

  useEffect(() => {
    // Chama a função de busca de eventos ao montar o componente
    buscarEventosNoBanco();
  }, []); // O array vazio assegura que a função será chamada apenas na montagem





/*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/eventos');
        setEventos(response.data);
      } catch (error) {
        console.error('Erro ao obter eventos:', error);
      }
    };

    fetchData();
  }, []);
  */

  useEffect(() => {
    const dataAtual = new Date();
    const eventoProximo = eventos.reduce((eventoProximo, eventoAtual) => {
      if (!eventoProximo || eventoAtual.start < eventoProximo.start) {
        return eventoAtual;
      }
      return eventoProximo;
    }, null);

    setEventoMaisProximo(eventoProximo);
  }, [eventos]);

  function EventoForm({ onAdicionarEvento }) {
    const [titulo, setTitulo] = useState('');
    const [data, setData] = useState('');
    const [valor, setValor] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      const novoEvento = {
        title: titulo,
        start: new Date(data),
        end: new Date(data),
        valor: parseFloat(valor),
      };

      onAdicionarEvento(novoEvento);

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
                    <div className="input-group input-group-lg mb-3">
                      <span className="input-group-text">Descrição da Meta:</span>
                      <input
                        type="text"
                        value={titulo}
                        className="form-control"
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                      />
                    </div>

                    <div className="input-group input-group-lg mb-3">
                      <span className="input-group-text">Valor da Meta:</span>
                      <input
                        className="form-control"
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        required
                      />

                      <span className="input-group-text">Data da Meta:</span>
                      <input
                        className="form-control"
                        type="datetime-local"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        required
                      />
                    </div>

                    <div className="text-center flex-grow-1">
                      <button className="btn btn-primary mb-3" type="submit">
                        <h6>Adicionar Evento</h6>
                      </button>
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
    <div className="container mt-5 mb-5">
            <Header />

     
  
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {mostrarCalendario ? (
          
          <div style={{ height: 500 }}>
             <button className="btn btn-primary btn-circle btn-xl" onClick={toggleElementos}>
    Voltar
      </button>
            <h1 className="text-center">Calendário de Metas</h1>
            <div className="card">
              <EventoForm onAdicionarEvento={adicionarEvento} />

              <div style={{ position: 'relative', top: '30px', height: 500 }}>
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

            <div style={{ position: 'relative', top: '30px', height: 500 }}>
            <table className="table">
            <thead>
      <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Data</th>
        <th>Valor</th>
        <th>Ações</th>
      </tr>
    </thead>
              <tbody>
                {eventos.map((evento) => (
                  <tr key={evento.id}>
                    <td>{evento.id}</td>
                    <td>{evento.title}</td>
                    <td>{moment(evento.start).format('DD-MM-YYYY')}</td> {/* Convertendo para string legível */}
                    <td>R${evento.valor}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleExcluirEvento(evento.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}


              </tbody>
            </table>
          </div>



          </div>
          
        ) : (
         
          <EventoMaisProximo /*corTexto ={corTexto}*/ eventoMaisProximo={eventoMaisProximo} toggleElementos={toggleElementos} /*total={total}*//>
       
       )} 
      </div>
    </div>
  );
};

export default CalendarioMetas;
