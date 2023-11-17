import React from 'react';
import './styles.css';
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import moment from 'moment';


const GridTable = ({setOnEdit, movimentacoes, setMovimentacoes, updateCardValues }) => {

    const handleDelete = async (id) => {
        //função assincrona por estar no banco, a porta mais o id de parametro, validação pelo then(promisse) data é o texto informado no backend e no toast a informação, a const newArray volta os outros usuários(menos o excluido)
            await axios
            .delete("http://localhost:8080/" + id)
            .then(({data})=>{
                const newArray = movimentacoes.filter((movimentacao)=>movimentacao.id !== id);
                setMovimentacoes(newArray);
                toast.success(data.message);
                updateCardValues();
        }).catch(({data}) => toast.error(data));
        
        setOnEdit(null);
        };
    
    const handleEdit = (item) => {
        setOnEdit(item);
    };
    


    return(

    <div className="col-md-9 desencostar">
          <div className="card">


    <table className="table">
  <thead>   
    <tr>
      <th style={{ width: '50%' }} scope="col">Descrição</th>
      <th style={{ width: '20%' }} scope="col">Operação</th>
      <th style={{ width: '20%' }} scope="col">Valor</th>
      <th style={{ width: '20%' }} scope="col">Data</th>
      <th style={{ width: '5%' }}scope="col">Editar</th>
      <th style={{ width: '5%' }}scope="col">Excluir</th>

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
    <tbody>
    {movimentacoes.map((item, i) => (
          <tr key={i}>
            <td>{item.descricao}</td>
            <td>{item.operacao}</td>
            <td className="d-none d-md-table-cell">{item.valor}</td>

            <td>{moment(item.data_mov).format('DD-MM-YYYY')}</td>

            <td style={{ textAlign: 'center' }}>
              <button className="btn" onClick={() => handleEdit(item)}>
              <i className="bi bi-pen-fill"></i>              
              </button>
            </td>
            <td style={{ textAlign: 'center' }}>
              <button className="btn"onClick={() => handleDelete(item.id)}>
              <i className="bi bi-trash3-fill text-danger"></i>              
              </button>
            </td>
          </tr>
        ))}
      </tbody>

</table>

    </div>
    </div>

    );
}

export default GridTable;