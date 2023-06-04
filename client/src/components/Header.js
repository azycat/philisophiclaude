import React,{Component} from 'react';
import logo from './img/apple.png';
import { useNavigate } from 'react-router-dom'

function Header() {    
    const navigate = useNavigate();

    return(
        <div className="App-header">
            <div class="form-check form-switch claude-switch">
                <input class="form-check-input" value={'true'===localStorage.getItem("friend")} onChange={(e) => {localStorage.setItem("friend", e.target.checked)}} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label class="form-check-label" for="flexSwitchCheckDefault">Friendlier Claude</label>
            </div>
            <div className="App-header-title">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 onClick={() => navigate('/')}>
                    Philaude
                    </h1>

                    
            </div>
            <div className="username-div">
                <input
                    type="text"
                    name="message"
                    value={localStorage.getItem("username")}
                    placeholder="Username"
                    onChange={(e) => {localStorage.setItem("username", e.target.value)}}
                />
            </div>
        </div>
    )
}

export default Header;