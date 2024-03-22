import React, { useEffect, useState } from 'react';
import './Home-style.css'; // Importando o arquivo CSS para estilos
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header/Header-component';

function Main() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Configura o Axios para enviar cookies com todas as solicitações
    axios.defaults.withCredentials = true;

    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://system-sign.onrender.com/auth/verify");
        if (response.data.status === true) {
          setAuthenticated(true);
          console.log(response.data.message)
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao verificar a autenticação:', error);
        navigate('/');
      }
    };

    checkAuthentication();
  }, [navigate]);

  return (
    <main className="home-container">
      <Header />
      {authenticated ? (
        <>
          <h1>Welcome to Our Website</h1>
          <p>This is a simple example of a Home page.</p>
          <p>Autor: Lucas Pedro Fernandes. <a href="https://github.com/LucasPedro123">Veja meu GitHub</a></p>

        </>
      ) : (
          <h1>Not Authorized</h1>
      )}
    </main>
  );
}

export default Main;
