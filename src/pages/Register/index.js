import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate} from "react-router-dom";
import * as yup from "yup";
import Axios from "axios";
import { toast } from "react-toastify";
import "./styles.css";


function Register () {
        const navigate = useNavigate();


    const handleRegister = (values) => {
        Axios.post("http://localhost:8080/users/register", {
          email: values.email,
          senha: values.senha,
        }).then((response) => {
          //alert(response.data.msg);
          toast.success(response.data.message);
          console.log(response);
          navigate("/");
        });
      };
    


    const validationsRegister = yup.object().shape({
        email: yup
          .string()
          .email("email inválido")
          .required("O email é obrigatório"),
        senha: yup
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .required("A senha é obrigatória"),
        confirmation: yup
          .string()
          .oneOf([yup.ref("senha"), null], "As senhas são diferentes")
          .required("A confirmação da senha é obrigatória"),
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
              <a className="nav-link" id="tab-login" data-mdb-toggle="pill" href="" role="tab"
                aria-controls="pills-login" aria-selected="false" onClick={()=>[navigate("/")]}>Login</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="tab-register" data-mdb-toggle="pill" href="" role="tab"
                aria-controls="pills-register" aria-selected="true" onClick={()=>[navigate("/registro")]}>Cadastro</a>
            </li>
          </ul>        

          <div className="tab-content">
        <div className="tab-pane fade show active mx-5" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
         
        <Formik
          initialValues={{}}
          onSubmit={handleRegister}
          validationSchema={validationsRegister}
        >
          <Form>
          <div className="text-center mb-3">
                <h2>FAÇA SEU CADASTRO</h2>
                </div>
    
<br></br>
<div className="form-outline mb-4 text-center">
                <label htmlFor="loginName" className="form-label text-center">
                  EMAIL:
              <Field name="email" className="form-control" placeholder="Email" />
              </label>
                <br></br>
              <ErrorMessage
                component="span"
                name="email"
                className="form-error text-danger"
              />
            </div>
    
            <div className="form-outline mb-4 text-center">
                <label htmlFor="loginPassword" className="form-label text-center">
                  SENHA              
                  <Field name="senha" type="password" className="form-control" placeholder="Senha" />
                </label>
                <br></br>    
              <ErrorMessage
                component="span"
                name="senha"
                className="form-error text-danger"
              />
            </div>
    
            <div className="form-outline mb-4 text-center">
                <label htmlFor="loginPassword" className="form-label text-center">
                  CONFIRMAR SENHA               
                  <Field
                name="confirmation"
                className="form-control"
                placeholder="Senha"
                type = "password"
              />
                </label>
                <br></br>
              <ErrorMessage
                component="span"
                name="confirmation"
                className="form-error text-danger"
              />
            </div>

            <div className="text-center">
            <button className="btn btn-primary btn-block mb-4" type="submit">
              Cadastrar
            </button>
            </div>

          </Form>
        </Formik>
      </div>
        </div>
        </div>
        </div>
        
        );
        }
    
    
              
    
                



    

export default Register;