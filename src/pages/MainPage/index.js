import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {useState,useEffect} from 'react';
import axios from 'axios';
import React from 'react';
import Navbar from './Navbar';
import CardsTopo from './CardsTopo';
import Header from './Header';
import FormTeste from './FormTeste';
import GridTable from './GridTable';
import Graph from './Graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import MetasSimps from './MetasSimp';
import EventoMaisProximo from '../EventoMaisProx';
import CalendarioMetas from '../CalendarioMetas';
import FormMov from './FormMov';
import "./styles.css";




const MainPage = () => {

  const [movimentacoes, setMovimentacoes] = useState([]);
  const [userId, setUserId] = useState(null);

  const [onEdit, setOnEdit] = useState(null);

  const [total, setTotal] = useState(0);
  const [ganhos, setGanhos] = useState(0);
  const [gastos, setGastos] = useState(0);

  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const toggleCalendario = () => {
    setMostrarCalendario(!mostrarCalendario);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    loadMovimentacoes(storedUserId);
  }, []);

  const loadMovimentacoes = (userId) => {
    axios.get(`http://localhost:8080/movimentacoes?userId=${userId}`)
      .then(response =>{ 
        setMovimentacoes(response.data);
        updateCardValues(response.data);
      })
      .catch(error => console.error('Erro ao obter movimentacoes:', error));
  };

  const handleAddMovimentacao = async () => {
    try {
      loadMovimentacoes(userId);
    } catch (error) {
      console.error('Erro ao adicionar movimentação:', error);
    }
  };

  const updateCardValues = (movimentacoesData) => {
    const ganhosData = calculateGanhos(movimentacoesData);
    const gastosData = calculateGastos(movimentacoesData);
    const totalData = ganhosData - gastosData;

    setGanhos(ganhosData);
    setGastos(gastosData);
    setTotal(totalData);
  };



  const calculateGanhos = (movimentacoesData) => {
    // Lógica para calcular ganhos com base nas movimentações
    // Exemplo fictício:
    return movimentacoesData.reduce((total, mov) => {
      return mov.operacao === 'Lucro' ? total + parseFloat(mov.valor) : total;
    }, 0);
  };

  const calculateGastos = (movimentacoesData) => {
    // Lógica para calcular gastos com base nas movimentações
    // Exemplo fictício:
    return movimentacoesData.reduce((total, mov) => {
      return mov.operacao === 'Gasto' ? total + parseFloat(mov.valor) : total;
    }, 0);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
  };
  
  const [eventoMaisProximo, setEventoMaisProximo] = useState(null); // Estado para rastrear o evento mais próximo
  /*novo
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
    loadMovimentacoes(storedUserId);
  }, []);

  const loadMovimentacoes = (userId) => {
    axios.get(`http://localhost:8080/movimentacoes?userId=${userId}`)
      .then(response => setMovimentacoes(response.data))
      .catch(error => console.error('Erro ao obter movimentacoes:', error));
  
  
    };

    */ 
   /* 
  const [movimentacoes, setMovimentacoes] = useState([]);

  const [total, setTotal] = useState(0);
  const [ganhos, setGanhos] = useState(0);
  const [gastos, setGastos] = useState(0);

  

  //O onEdit será passado no formulário, pois ele que recebe os valores alterados.


  const getMovimentacoes = async () => {
    try {
      const res = await axios.get("http://localhost:8080");
      //sorteia por nome e define qual tem a ordem maior
      const movimentacoesData = res.data.reverse();
      setMovimentacoes(movimentacoesData);


      const ganhosData = calculateGanhos(movimentacoesData);
      const gastosData = calculateGastos(movimentacoesData);
      const totalData = ganhosData - gastosData;

      setMovimentacoes(movimentacoesData);
      setGanhos(ganhosData);
      setGastos(gastosData);
      setTotal(totalData);



    } catch (error) {
      toast.error(error);
      }
  };
  
  useEffect(() => {
    getMovimentacoes();
  }
  , [setMovimentacoes]);


  const handleFormSubmit = async () => {
    getMovimentacoes();
  };




  const updateCardValues = async () => {
    try {
      const res = await axios.get("http://localhost:8080");
      const movimentacoesData = res.data.reverse();

      const ganhosData = calculateGanhos(movimentacoesData);
      const gastosData = calculateGastos(movimentacoesData);
      const totalData = ganhosData - gastosData;

      setMovimentacoes(movimentacoesData);
      setGanhos(ganhosData);
      setGastos(gastosData);
      setTotal(totalData);

    } catch (error) {
      toast.error(error);
    }
  };

  */

/*  updateCardValues={updateCardValues} */


    return(
        <div className="largo">
        <div  className="bg-body-tertiary container-fluid largo w-auto">
        <Navbar /> 
        <Header />  
        <CardsTopo total={total} ganhos={ganhos} gastos={gastos} />

        {/*<FormTeste onEdit={onEdit} setOnEdit={setOnEdit} getMovimentacoes={getMovimentacoes} />*/}
        <FormMov setOnEdit={setOnEdit} userId={userId} onAddMovimentacao={handleAddMovimentacao} />
        <div style={{ display: 'flex' }}>

       <GridTable movimentacoes={movimentacoes} setMovimentacoes={setMovimentacoes} setOnEdit={setOnEdit} />
                <div className="cartinhas">

        <Graph movimentacoes={movimentacoes} />
        </div>
        </div>

        <div className="barra-inferior" style={{ zIndex: 1 }}>
            <CalendarioMetas />

        </div>       
      </div>
        
        
      {/*   <EventoMaisProximo eventoMaisProximo={eventoMaisProximo} />
      */} 
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
        <div>
     
    </div>

        </div>
    );
}

export default MainPage;