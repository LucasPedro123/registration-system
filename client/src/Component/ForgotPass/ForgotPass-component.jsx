import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import axios from 'axios';
import './Forgot-style.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/forgot-pass", {
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
        <div className="forgot-password-container">
            <h2>Esqueci a Senha</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
