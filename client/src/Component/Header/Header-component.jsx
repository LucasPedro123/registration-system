import './Header-style.css';
import Logo from '../../assets/Img/logo.png'
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
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
                <button className="btnLogin-popp" onClick={handlePopupButtonClick}>Login</button>
            </nav>
        </header>
    )
}

export default Header;
