import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword-style.css';
import Header from '../Header/Header-component';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { token } = useParams(); // Captura o token da URL
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://system-sign.onrender.com/auth/reset-password", {
                token, // Envie o token como parte do corpo da solicitação
                password,
            });
            console.log(response.data);
            setMessage(response.data.message);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Erro ao tentar redefinir a senha. Verifique sua conexão de rede e tente novamente.');
        }
    };

    return (
        <>
            <Header />
            <div className="forgot-password-container">

                <h2>Resetar a Senha</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <i className="fa-solid fa-lock-keyhole"></i>
                        <input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label htmlFor="pass">Senha</label>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
