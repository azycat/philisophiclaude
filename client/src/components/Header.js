import React,{Component} from 'react';
import logo from './img/logo.svg';
import { useNavigate } from 'react-router-dom'

function Header() {    
    const navigate = useNavigate();

    return(
        <div className="col-10 App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1
                role="button"
                onClick={() => navigate('/')}
            >
                Philaude
            </h1>
        </div>
    )
}

export default Header;