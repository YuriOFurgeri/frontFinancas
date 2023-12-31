import React, {useState} from 'react';
import './styles.css';
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from 'moment';


const GridTable = ({setOnEdit, movimentacoes, setMovimentacoes, updateCardValues /* userId*/ }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(movimentacoes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = movimentacoes.slice(startIndex, endIndex);



    const handleDelete = async (id) => {
        //função assincrona por estar no banco, a porta mais o id de parametro, validação pelo then(promisse) data é o texto informado no backend e no toast a informação, a const newArray volta os outros usuários(menos o excluido)
            await axios
            .delete("http://localhost:8080/movimentacoes/" + id)
            .then(({data})=>{
                const newArray = movimentacoes.filter((movimentacao)=>movimentacao.id !== id);
                setMovimentacoes(newArray);
                toast.success(data.message);
                updateCardValues();
        }).catch(({data}) => toast.error(data));
        
        //setOnEdit(null);
        };
    
    const handleEdit = (item) => {
        setOnEdit(item);
    };
    
    const getRowClassName = (operacao) => {
      return operacao === 'Lucro' ? 'table-success' : 'table-danger';
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn ${i === currentPage ? 'btn-primary' : 'btn-light'}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };


    return(

    <div className="col-md-9 desencostar">
          <div className="card tabelapos">


    <table className="table itenslista tabelamob">
  <thead>   
    <tr>
      <th style={{ width: '50%' }} scope="col">Descrição</th>
            <th className="itemlargo itemsumir" style={{ width: '20%' }} scope="col">Valor</th>

      <th className="itemsumir" style={{ width: '10%' }} scope="col">Operação</th>
      <th className="itemsumir" style={{ width: '20%' }} scope="col">Data</th>
      {/*<th style={{ width: '2%' }}scope="col">Editar</th>*/}
      <th className="itemsumir" style={{ width: '2%' }}scope="col">Excluir</th>

    </tr>
  </thead>
{/*  <tbody>

    <tr class="table-info">
      <td>Ganhei meu salário</td>
      <td>R$ 1350</td>
      <td>Lucro</td>
      <td>01/11/2023</td>

    </tr>
    <tr class="table-danger">
      <td>Comprei um gift card</td>
      <td>R$ 52,00</td>
      <td>Gasto</td>
      <td>04/11/2023</td>

    </tr>
    <tr class="table-danger">
      <td>Comprei as decorações de natal</td>
      <td>R$ 151,25</td>
      <td>Gasto</td>
      <td>04/11/2023</td>
    </tr>
  </tbody>
    */}
    <tbody className='listacima'>
    {currentItems.map((item, i) => (
          <tr key={i} className={getRowClassName(item.operacao)}>
            <td className="itenslista">{item.descricao}</td>
            <td className="d-none d-md-table-cell itenslista">R$ {item.valor}</td>
            <td className="itenslista itemsumir">{item.operacao}</td>

            <td className="itenslista itemsumir">{moment(item.data_mov).format('DD-MM-YYYY')}</td>
            {/*</tr><td className="itenslista">{item.idusuario === userId ? 'Você' : 'Outro Usuário'}</td>*/}
{/*
            <td className="itemsumir" style={{ textAlign: 'center' }}>
              <button className="btn" onClick={() => handleEdit(item)}>
              <i className="bi bi-pen-fill"></i>              
              </button>
            </td>
    */}
            <td style={{ textAlign: 'center' }}>
              <button className="btn itemsumir"onClick={() => handleDelete(item.id)}>
              <i className="bi bi-trash3-fill text-danger"></i>              
              </button>
            </td>
          </tr>
        ))}
      </tbody>

</table>
<div className="pagination-buttons">
          {renderPaginationButtons()}
        </div>

    </div>
    </div>

    );
}

export default GridTable;