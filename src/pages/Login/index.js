import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link} from "react-router-dom";
import * as yup from "yup";
import Axios from "axios";


function Login() {
        const navigate = useNavigate();

    const handleLogin = (values) => {
        Axios.post("http://localhost:8080/login", {
          email: values.email,
          password: values.password,
        }).then((response) => {
          alert(response.data.msg);
            ///se estiver correto useNavigate("/home")
        
            if (response.data.msg === "Usuário logado") {
              console.log("Redirecionando para /home");
              navigate("/home");
            } else {
              console.log("Login falhou");
              // Trate o login falho aqui, se necessário
            }
          
      
        })
.catch((error) => {
      // Se ocorrer um erro na requisição (ex: servidor indisponível)
      console.error("Erro ao fazer login:", error);
      // Trate o erro de forma adequada, por exemplo, exibindo uma mensagem ao usuário
    });

      };

      const validationsLogin = yup.object().shape({
        email: yup
          .string()
          .email("email inválido")
          .required("O email é obrigatório"),
        password: yup
          .string()
          .min(8, "A senha deve ter pelo menos 8 caracteres")
          .required("A senha é obrigatória"),
      });
  return (
<div className="container">
      <h1>Login</h1>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>
          {/*Outro campo*/}
          <div className="form-group">
            <Field name="password" className="form-field" placeholder="Senha" />

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
          <Link to="/register" className="btn btn-primary">Cadastre-se</Link>
        </Form>
      </Formik>
    </div>

    );
}

export default Login;