import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles.css";
import SpeechComponent from '../SpeechComponent';
import extractInfo from '../ExtractInfo';

const FormMov = ({ userId, onAddMovimentacao, setOnEdit}) => {
  const [descricao, setDescricao] = useState('');
  const [operacao, setOperacao] = useState(''); // ['entrada', 'saida'
  const [valor, setValor] = useState('');
  const [data_mov, setData_mov] = useState('');
  const [erro, setErro] = useState('');

  const [transcript, setTranscript] = useState('');


  useEffect(() => {
    const movimentacao = {
      descricao,
      operacao,
      valor,
      data_mov,
    };

    if (transcript) {
      const processingResult = extractInfo(transcript);

      setDescricao(processingResult.description);
      setOperacao(processingResult.action);
      setValor(processingResult.value);
      setData_mov(processingResult.date);
    }
  }, [transcript]);


  const handleAdicionarMovimentacao = async () => {
    try {
      // Validar se os campos obrigatórios foram preenchidos
      if (!descricao || !operacao || !valor || !data_mov ) {
        setErro('Todos os campos são obrigatórios.');
        return;
      }

      // Realizar a requisição para adicionar a movimentação
      const response = await axios.post('http://localhost:8080/movimentacoes', {
        userId,
        descricao,
        operacao,
        valor,
        data_mov,
      });

      console.log('Movimentação adicionada com sucesso:', response.data);

      // Chame a função de callback para recarregar as movimentações após a adição
      onAddMovimentacao();

      // Limpe os campos do formulário e resete o estado de erro
      setDescricao('');
        setOperacao('');
      setValor('');
      setData_mov('');
      setErro('');
    } catch (error) {
      console.error('Erro ao adicionar movimentação:', error);

      // Atualize o estado de erro em caso de falha na requisição
      setErro('Erro ao adicionar movimentação. Tente novamente mais tarde.');
    }
  };

  

  return (
    <div>
    <div className="container-fluid mt-3">
<div className="row justify-content-center align-items-center">
<div className="col-12 col-md-9 col-lg-10 mb-4 formlargo">
  <div className="card">

<form>
  <div className="text-center flex-grow-1 cima">
    <span className="text-muted">Adicione aqui suas movimentações</span>
    </div>
    <div className="card-content">
      <div className="card-body d-flex align-items-center">
        <div>
            <SpeechComponent onTranscriptChange={setTranscript} />
        </div>
        <div className="text-center flex-grow-1 baixo">
<div className="container">

<div className="input-group mb-3 input-group-lg ">               
<span className="input-group-text sumir">Descrição:</span>
<input
name="descricao"

value = {descricao}
onChange={(e) => setDescricao(e.target.value)}


type="text"
className="form-control"
aria-label="Amount (to the nearest dollar)"
/>
</div>

<div className="input-group input-group-lg mb-3">
<span className="input-group-text">R$</span>
<input
style={{ width: '33%' }} // Ajuste o valor conforme necessário

name="valor"
type="float"

value={valor}
onChange={(e) => setValor(e.target.value)}

className="form-control"
aria-label="Amount (to the nearest dollar)"
/>
<span className="input-group-text sumir"></span>


<select
      className="form-select form-select-end form-control-lg" // Adicionei a classe form-control-lg para aumentar a altura
      //value={formData.action}
      //onChange={(e) => setFormData({ ...formData, action: e.target.value })}
      required
        name="operacao"

        value={operacao}
        onChange={(e) => setOperacao(e.target.value)}
    >
      <option disabled value="">
        Selecione uma ação
      </option>
      <option value="Lucro">Lucro</option>
      <option value="Gasto">Gasto</option>
    </select>
    <span className="input-group-text"></span>


    <input
      className="form-control" // Adicionei a classe form-control-lg para aumentar a altura
      placeholder="Data"
      type="date"
        name="data_mov" 
        value={data_mov}
        onChange={(e) => setData_mov(e.target.value)}
      //value={formData.date}
      //onChange={handleDateChange}
    />
</div>

</div>
        </div>
        
        <button className='btn btn-rounded-pill btn-primary d-block mb-2' type="button" onClick={handleAdicionarMovimentacao}>
        <h6>Salvar</h6>
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
};

export default FormMov;
