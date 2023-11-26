import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../MainPage/Navbar';
import Header from '../MainPage/Header';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:8080/users/${userId}`);
        setUsuario(response.data);
      } catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
      }
    };

    buscarUsuario();
  }, []);

  const handleExcluirUsuario = async () => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.delete(`http://localhost:8080/users/${userId}`);
      console.log(`Usuário ${userId} excluído com sucesso!`);
      navigate('/');
    } catch (error) {
      console.error(`Erro ao excluir usuário:`, error);
    }
  };

  const handleAlterarSenhaClick = () => {
    setMostrarFormulario(true);
  };

  const handleAlterarSenha = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('userId');
      await axios.put(`http://localhost:8080/users/${userId}/alterar-senha`, {
        novaSenha: novaSenha,
      });
      console.log('Senha alterada com sucesso!');
      setMostrarFormulario(false); // Oculta o formulário após a alteração
      // Recarrega a página para refletir as alterações
      window.location.reload();
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
    }
  };

  return (
  
    <div className="container mt-5">
      <Navbar />
      <Header />
      

      <div className="card text-center">
        
        <div className="card-header">
          <h3>Perfil do Usuário</h3>
        </div>
        <div className="card-body">
          {usuario ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Senha</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{usuario.email}</td>
                  <td>
                  <div>
                    {showPassword ? (
                      <span>{usuario.senha}   </span>
                    ) : (
                      <span>*********   </span>
                    )}
                    <button
                      className="btn btn-link"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                </td>                  <td>
                    <button className="btn btn-danger" onClick={handleExcluirUsuario}>
                      Excluir
                    </button>
                    <button className="btn btn-primary" onClick={handleAlterarSenhaClick}>
                      Alterar Senha
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            
          ) : (
            <p>Carregando...</p>
          )}
          
        </div>

        {mostrarFormulario && (
          <div>
            <form>
              <div className="form-group">
                <label htmlFor="novaSenha">Nova Senha:</label>
                <input
                  type="password"
                  className="form-control"
                  id="novaSenha"
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-2 mb-2" onClick={handleAlterarSenha}>
                Alterar Senha
              </button>
            </form>
          </div>
        )}
      </div>
      <div>
    <button className="btn btn-primary mt-3" onClick={()=>[navigate("/movimentacoes")]}>Voltar</button>
    <button className="btn btn-danger mt-3 ms-2" onClick={()=>[navigate("/")]}>Sair</button>

      </div>

    </div>
  );
};

export default Perfil;
