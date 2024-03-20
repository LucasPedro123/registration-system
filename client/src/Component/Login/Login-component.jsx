import './Login-style.css';
import React, { useState, useContext } from 'react';
import MyContext from '../../Context/ContextState'; // Importa o contexto
import axios from 'axios'; // Importe o axios para fazer requisições HTTP
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isActive, setIsActive] = useState(false);
    const { isPopupActive, setIsPopupActive } = useContext(MyContext);
    const [error, setError] = useState(''); // Defina a variável de erro usando useState
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const [suceess, setSucess] = useState(false);

    const handleRegisterLinkClick = () => {
        setIsActive(true);
    };
    const handleRegisterButtonClick = () => {
        if (suceess == true) {
            setIsActive(false)
        }
    }
    const handleLoginLinkClick = () => {
        setIsActive(false);
    };

    const handleCloseButtonClick = () => {
        setIsPopupActive(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setSucess(true);
        try {
            const response = await axios.post("https://system-sign.onrender.com/auth/signup", {
                username,
                email,
                password
            });
            console.log(response.data); // Mensagem de sucesso do servidor
        } catch (error) {
            console.error(error);
            setError('Erro ao tentar se registrar. Verifique sua conexão de rede e tente novamente.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://system-sign.onrender.com/auth/login", {
                email,
                password
            });
            console.log(response.data); // Mensagem de sucesso do servidor
            Navigate('/home');
        } catch (error) {
            console.error(error);
            setError('Erro ao tentar fazer login. Verifique suas credenciais e tente novamente.');
        }
    };

    return (
        <>  
            <div className={`wrapper ${isPopupActive ? 'active-popup' : ''} ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-xmark" onClick={handleCloseButtonClick}></i>

                <div className="form-box register">
                    <h2>Registrar</h2>
                    <form onSubmit={handleSignUp}>
                        <div className="input-box">
                            <i className="fa-solid fa-user"></i>
                            <input id="name" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                                <label htmlFor="name">Nome</label>
                        </div>
                        <div className="input-box">
                            <i className="fa-solid fa-envelope"></i>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-box">
                            <i className="fa-solid fa-lock-keyhole"></i>
                            <input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label htmlFor="pass">Senha</label>
                        </div>
                        <div className="remember-forgot">
                            <label htmlFor=""><input type="checkbox"/> Concorda com os termos e condições</label>
                        </div>
                        <button type="submit" onClick={handleRegisterButtonClick} className="btn">
                            Registrar
                        </button>


                        <div className="login-register">
                            <p>
                                Already have an account? <a href="#" className="login-link" onClick={handleLoginLinkClick}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="form-box login">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-box">
                            <i className="fa-solid fa-envelope"></i>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-box">
                            <i className="fa-solid fa-lock-keyhole"></i>
                            <input id="pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label htmlFor="pass">Senha</label>
                        </div>
                        <div className="remember-forgot">
                            <label htmlFor=""><input type="checkbox"/> Remember forgot</label>
                            <Link to="/forgotpassword">Forgot Password?</Link>
                        </div>
                        <button type="submit">
                            Login
                        </button>


                        <div class="login-register">
                            <p>
                                Don't have an account? <a href="#" class="register-link" onClick={handleRegisterLinkClick}>Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;