import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Forgot-style.css'
import Header from '../Header/Header-component';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false); // Estado para controlar a exibição da animação de sucesso

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
            setShowSuccessAnimation(true); // Define o estado para exibir a animação de sucesso
            setMessage(response.data.message);
            setTimeout(() => {
                setShowSuccessAnimation(false); // Esconde a animação após um período de tempo
                Navigate('/');
            }, 2000); // Tempo em milissegundos para esconder a animação (por exemplo, 2 segundos)
        } catch (error) {
            console.error(error.response);
            setError('Email não registrado');

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
                {showSuccessAnimation && <p className="success-animation">Email enviado com sucesso!</p>} {/* Exibindo a animação de sucesso */}
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
