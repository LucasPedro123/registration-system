import React, { useEffect } from 'react';
import './Home-style.css'; // Importando o arquivo CSS para estilos
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/auth/verify')
      .then(res => {
        if (res.data.status == true) {
          console.log('Check')
        } else {
          navigate('/')
        }
      
    })
  }, [])

  return (
    <div className="home-container"> {/* Aplicando a classe do CSS */}
      <h1>Welcome to Our Website</h1>
      <p>This is a simple example of a Home page.</p>
    </div>
  );
}

export default Home;
