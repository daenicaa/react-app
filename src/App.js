import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
import './style/style.scss';

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

function App() {

  const [state, setState] = useState(
    { isLoggedIn: false, showRegister: false }
  );

  function handleLoginClick() {
    setState({isLoggedIn: true});
  };

  function handleLogoutClick() {
    setState({isLoggedIn: false});
  };

  function handleRegisterClick() {
    setState({showRegister: true});
  };

  return (
    <Router>
      <Header isLoggedIn={state.isLoggedIn} state={state} handleRegisterClick={handleRegisterClick} handleLoginClick={handleLoginClick} handleLogoutClick={handleLogoutClick} />
      <Main isLoggedIn={state.isLoggedIn}/>
      <Footer />
    </Router>
  );
}

export default App;
