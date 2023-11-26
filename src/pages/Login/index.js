import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email: values.email,
        senha: values.senha,
      });

      console.log('Login bem-sucedido:', response.data);
      const userId = response.data.userId;
      localStorage.setItem('userId', userId);
      navigate('/movimentacoes');
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const validationsLogin = yup.object().shape({
    email: yup.string().email('Email inválido').required('O email é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),
  });

  return (
    <div className="container d-flex justify-content-center align-items-center bg-body-tertiary" style={{ height: '100vh' }}>
        <div className="left-container desesticar" style={{ width: '50%' }}>
          
      <h1 className="sumir" style={{ fontSize: '2.5rem' }}><i className="bi bi-rocket text-danger"></i>
FinançasApp</h1>
    </div>
    <div className='card right-container'>
    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="" role="tab"
            aria-controls="pills-login" aria-selected="true" onClick={()=>[navigate("/")]}>Login</a>
        </li>
        <li className="nav-item" role="presentation">
          <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="" role="tab"
            aria-controls="pills-register" aria-selected="false" onClick={()=>[navigate("/registro")]}>Cadastre-se</a>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade show active mx-5" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
          <Formik
            initialValues={{ email: '', senha: '' }}
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
          >
            <Form>
              <div className="text-center mb-3">
                <h2>FAÇA SEU LOGIN</h2>
                </div>
    
<br></br>

              <div className="form-outline mb-4 text-center">
                <label htmlFor="loginName" className="form-label text-center">
                  EMAIL:
                  <Field type="text" id="loginName" name="email" className="form-control" />
                </label>
                <br></br>
                <ErrorMessage name="email" component="span" className="text-danger" />
              </div>

              <div className="form-outline mb-4 text-center">
                <label htmlFor="loginPassword" className="form-label text-center">
                  SENHA
                  <Field type="password" id="loginPassword" name="senha" className="form-control" />
                </label>
                <br></br>
                <ErrorMessage name="senha" component="span" className="text-danger" />
              </div>

              

        
                <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block mb-4">Entrar</button>
                </div>
              <div className="text-center">
                <p>Não possui conta? <a href="" onClick={()=>[navigate("/registro")]}>Cadastre-se</a></p>
              </div>
            </Form>
          </Formik>
        </div>

        {/* Register - Este formulário pode ser movido para outro componente conforme necessário */}
        <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
          {/* Componente de registro aqui... */}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
