import React from "react";
import { Link } from "react-router-dom";

import LoginControl from '../components/Login';

function Header(props){
  console.log("props", props)
	return (
    <header className="l-header">
      <div className="l-container logo-login flex flex-align-center flex-space-between">
        <Link to="/"><div className="site-logo"></div></Link>
        <LoginControl state={props.state} handleRegisterClick={props.handleRegisterClick} handleLoginClick={props.handleLoginClick} handleLogoutClick={props.handleLogoutClick} />
      </div>
    </header>
	);
}

export default Header;
