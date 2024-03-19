import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const Navigate = useNavigate();
  
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://system-sign.onrender.com/auth/signup", {
                username,
                email,
                password
            }).then(() => {
              Navigate('/login')
            })
            console.log(response.data); // Mensagem de sucesso do servidor
        } catch (error) {
            console.error(error);
            setError('Erro ao tentar se registrar. Verifique sua conexão de rede e tente novamente.');
        }
    };

    return (
        <div className="signup-container">
            <h2>SignUp Form</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
            <p>If you already have an account, please <Link to="/login">here</Link>.</p>
        </div>
    );
}

export default Signup;
