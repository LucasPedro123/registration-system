import './Login-style.css';
import React, { useState, useContext } from 'react';
import MyContext from '../../Context/ContextState'; // Importa o contexto
import axios from 'axios'; // Importe o axios para fazer requisições HTTP
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [isActive, setIsActive] = useState(false);

    const { isPopupActive, setIsPopupActive, setAuthorizedLogin  } = useContext(MyContext);



    const [error, setError] = useState(''); // Defina a variável de erro usando useState
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');


    const handleRegisterLinkClick = () => {
        setIsActive(true);
    };
   
    const handleLoginLinkClick = () => {
        setIsActive(false);
    };

    const handleCloseButtonClick = () => {
        setIsPopupActive(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setSuccess(true);
        try {
            const response = await axios.post("https://system-sign.onrender.com/auth/signup", {
                username,
                email,
                password
            });
            setAuthorizedLogin(true);
            setIsActive(false)
            setMessage(response.data.message)
            console.log(response.data); // Mensagem de sucesso do servidor
        } catch (error) {
            console.error(error.response.data); // Log da mensagem de erro do servidor
            setMessage(error.response.data.message); // Exibindo a mensagem de erro do servidor
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
            setMessage(response.data.message);
            Navigate('/home');
        } catch (error) {
            console.error(error.response.data); // Log da mensagem de erro do servidor
            setMessage(error.response.data.message); // Exibindo a mensagem de erro do servidor
        }
    };

    return (
        <>  
            <div className={`wrapper ${isPopupActive ? 'active-popup' : ''} ${isActive ? 'active' : ''}`}>
                <i className="fa-solid fa-xmark" onClick={handleCloseButtonClick}></i>

                <div className="form-box register">
                    <h2>Registrar</h2>
                {message && <p className="error-message">{message}</p>} {/* Exibindo a mensagem de erro */}
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
                        <button type="submit"  className="btn">
                            Registrar
                        </button>


                        <div className="login-register">
                            <p>
                                Já tem uma conta? <a href="#" className="login-link" onClick={handleLoginLinkClick}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
                <div className="form-box login">
                    <h2>Login</h2>
                    {message && <p className="error-message">{message}</p>} {/* Exibindo a mensagem de erro */}

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
                            <label htmlFor=""><input type="checkbox"/> Lembrar-me sempre</label>
                            <Link to="/forgotpassword">Esqueci senha?</Link>
                        </div>
                        <button type="submit">
                            Login
                        </button>


                        <div class="login-register">
                            <p>
                                Não tem uma conta? <a href="#" class="register-link" onClick={handleRegisterLinkClick}>Cadastre-se</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
