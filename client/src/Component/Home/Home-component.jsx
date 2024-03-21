import React, { useEffect } from 'react';
import './Home-style.css'; // Importando o arquivo CSS para estilos
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header-component';


function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    // Configura o Axios para enviar cookies com todas as solicitações
    axios.defaults.withCredentials = true;

    axios.get('https://system-sign.onrender.com/auth/verify')
      .then(res => {
        if (res.data.status === true) {
          console.log('Usuário autenticado');
        } else {
          console.log('Não autorizado');
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Erro ao verificar a autenticação:', error);
        navigate('/');
      });
  }, []);

  return (
    <main className="home-container">
      <Header/>
      <h1>Welcome to Our Website</h1>
      <p>This is a simple example of a Home page.</p>
    </main>
  );
}

export default Main;
