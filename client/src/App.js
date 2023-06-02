import logo from './logo.svg';
import React from 'react'
import './App.css';

import claude from './services/claude'
import { Home } from './components/Home'
import { Department } from './components/Department';
import { Meepy } from './components/Meepy';

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
   <div className="container">


    <Routes>
      <Route path='/' element={<Home/>} exact /> # map Home page
      <Route path='/department' element={<Department/>} exact/>
      <Route path='/meepy' element={<Meepy/>} exact/>
    </Routes>
   </div>
   </BrowserRouter> 
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>

      

    //     <button
    //       onClick={claude.getNewActivity}
    //       title="Learn More"
    //       color="#841584"
    //       accessibilityLabel="Learn more about this purple button"
    //     />

    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    // //     </a>
    //   </header>
    // </div>
  );
}

export default App;
