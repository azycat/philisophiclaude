import React,{Component} from 'react';
import logo from './img/logo.svg';
import { useNavigate } from 'react-router-dom'

function Header() {    
    const navigate = useNavigate();

    return(
        <div className="App-header">
            <div className="App-header-title">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 onClick={() => navigate('/')}>
                    Philaude
                    </h1>
            </div>
        </div>
    )
}

export default Header;