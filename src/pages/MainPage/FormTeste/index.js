import React ,{useRef, useEffect, useState} from 'react';
import './styles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import SpeechComponent from '../SpeechComponent';
import extractInfo from '../ExtractInfo';

const FormTeste = ({getMovimentacoes, onEdit, setOnedit}) => {

    
    const ref = useRef();

    const [transcript, setTranscript] = useState('');
    

    useEffect(() => {
        if(onEdit){
            const movimentacao = ref.current;

            movimentacao.descricao.value = onEdit.descricao;
            movimentacao.operacao.value = onEdit.operacao;
            movimentacao.valor.value = onEdit.valor;
            movimentacao.data_mov.value = onEdit.data_mov;
        }
    }, [onEdit]);

    useEffect(() => {
      const movimentacao = ref.current;
      if (transcript) {
        const processingResult = extractInfo(transcript);
  
        movimentacao.descricao.value = processingResult.description;
        movimentacao.operacao.value = processingResult.action;
        movimentacao.valor.value = processingResult.value;
        movimentacao.data_mov.value = processingResult.date;
      }
    }, [transcript]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movimentacao = ref.current;
        if(
            !movimentacao.descricao.value||
            !movimentacao.operacao.value||
            !movimentacao.valor.value||
            !movimentacao.data_mov.value //||
            //!movimentacao.idusuario // Certifique-se de incluir o ID do usuário
            ){
            return toast.warn("Preencha todos os campos");
        }
        if(onEdit){
            await axios
                .put("http://localhost:8080" + onEdit.id, {
                    descricao: movimentacao.descricao.value,
                    operacao: movimentacao.operacao.value,
                    valor: movimentacao.valor.value,
                    data_mov: movimentacao.data_mov.value,                
                    //idusuario: movimentacao.idusuario, // Inclua o ID do usuário
                  })
                    
                    .then(({data}) => 
                toast.success(data))
            .catch(({data}) => 
                toast.error(data));

        } else {
            await axios
            .post("http://localhost:8080", {
                descricao: movimentacao.descricao.value,
                operacao: movimentacao.operacao.value,
                valor: movimentacao.valor.value,
                data_mov: movimentacao.data_mov.value,
               // idusuario: movimentacao.idusuario, // Inclua o ID do usuário

              })
            .then(({data}) => {
                toast.success(data);
            })
            .catch(({data}) => {
                toast.error(data);
            });
        }
        movimentacao.descricao.value = "";
        movimentacao.operacao.value = "";
        movimentacao.valor.value = "";
        movimentacao.data_mov.value = "";

        //setOnEdit(null);
        getMovimentacoes();
    }; 

/*
    const handleMicButtonClick = () => {
      // Adicione lógica aqui para iniciar o reconhecimento de voz
      // Pode definir um estado ou qualquer outra lógica necessária
    };

    const limparForm = () => {
      const movimentacao = ref.current;

      movimentacao.descricao.value = "";
      movimentacao.operacao.value = "";
      movimentacao.valor.value = "";
      movimentacao.data_mov.value = "";
    };
    */
    return (

        <div>
            <div className="container-fluid mt-3">
      <div className="row justify-content-center align-items-center">
        <div className="col-12 col-md-9 col-lg-10 mb-4 formlargo">
          <div className="card">

<form ref={ref} onSubmit={handleSubmit}>
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
<span className="input-group-text">Descrição:</span>
  <input
    name="descricao"

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
    className="form-control"
    aria-label="Amount (to the nearest dollar)"
  />
  <span className="input-group-text"></span>


  <select
              className="form-select form-select-end form-control-lg" // Adicionei a classe form-control-lg para aumentar a altura
              //value={formData.action}
              //onChange={(e) => setFormData({ ...formData, action: e.target.value })}
              required
                name="operacao"
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
              //value={formData.date}
              //onChange={handleDateChange}
            />
</div>

</div>
                </div>
                
                <button className='btn btn-rounded-pill btn-primary d-block mb-2' type="submit">
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
}

export default FormTeste;