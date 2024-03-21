import './Header-style.css';
import Logo from '../../assets/Img/Logo.png'
import React, { useState, useContext } from 'react';

import MyContext  from '../../Context/ContextState'; // Importa o contexto
import { Link } from 'react-router-dom';


function Header() {
    const { isPopupActive, setIsPopupActive } = useContext(MyContext);

    const handlePopupButtonClick = () => {
        setIsPopupActive(true);
    };
    
    return (
        <header>
            <Link to='/'><img src={Logo} width="80px" alt=""/></Link>
            <nav class="navigation">
                <a href="/Home">Home</a>
                <a href="#">Sobre</a>
                <a href="#">Serviços</a>
                <a href="#">Contatos</a>
                <button className="btnLogin-popp" onClick={handlePopupButtonClick}>Login</button>
            </nav>
        </header>
    )
}

export default Header;
