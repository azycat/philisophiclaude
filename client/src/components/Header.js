import React,{Component} from 'react';
import logo from './img/logo.svg';

class Header extends Component {    
    render() {
        return(
            <div className="row bg-dark">
                <div className="col-10 App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Philaude</h1>
                </div>
            </div>
        )
    }
}

export default Header;