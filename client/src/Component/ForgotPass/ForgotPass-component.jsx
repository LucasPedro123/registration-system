import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Forgot-style.css'
import Header from '../Header/Header-component';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const Navigate = useNavigate();

    const handleBack = () => {
        Navigate('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://system-sign.onrender.com/auth/forgot-pass", {
                email,
            });
            console.log(response.data); // Mensagem de sucesso do servidor
            Navigate('/login');
        } catch (error) {
            console.error(error);
            setError('Erro ao tentar se registrar. Verifique sua conexão de rede e tente novamente.');
        }
    };

    return (
        <>
            <Header/>
            <div className="forgot-password-container" data-aos="flip-left">
                <div className='iconBack'> 
                    <i class="fa-solid fa-arrow-left" onClick={handleBack}></i>
                </div>
                <h2>Esqueci a Senha</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <i className="fa-solid fa-envelope"></i>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;
