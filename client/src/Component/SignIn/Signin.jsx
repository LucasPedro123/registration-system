import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css'; // Importando o arquivo CSS

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

    const Navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                email,
                password
            });
            console.log(response.data); // Mensagem de sucesso do servidor
            Navigate('/home');
        } catch (error) {
            console.error(error);
            setError('Erro ao tentar se registrar. Verifique sua conexão de rede e tente novamente.');
        }
    };

    return (
        <div className="container"> {/* Aplicando a classe do CSS */}
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                {error && <div className="error-message">{error}</div>} {/* Exibir mensagem de erro se houver */}
                <div className="form-group"> {/* Aplicando a classe do CSS */}
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group"> {/* Aplicando a classe do CSS */}
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p className="forgot-password">
                Forgot your password?
            </p>
        </div>
    );
};

export default Signin;
