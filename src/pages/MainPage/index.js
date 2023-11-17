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


const MainPage = () => {
    const exemploChart = [
        { action: 'lucro', value: 1146.75 },
        { action: 'perda', value: 203.25 },
      ];



      
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

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






    return(
        <>
        <div  className="bg-body-tertiary">
        <div>
        <Navbar /> 
        <Header />  
        <CardsTopo total={total} ganhos={ganhos} gastos={gastos} />
        <FormTeste onEdit={onEdit} setOnEdit={setOnEdit} getMovimentacoes={getMovimentacoes} />
        <div style={{ display: 'flex' }}>

        <GridTable movimentacoes={movimentacoes} setMovimentacoes={setMovimentacoes} setOnEdit={setOnEdit} updateCardValues={updateCardValues} />
        <Graph movimentacoes={movimentacoes} />
        </div>
        </div>
        <MetasSimps />
        </div>
        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT}/>
        <div>
     
    </div>

    </>    
    );
}

export default MainPage;