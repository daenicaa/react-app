import React from "react";
import { Link } from "react-router-dom";

import LoginControl from '../components/Login';

function Header(){
	return (
    <header className="l-header">
      <div className="l-container logo-login flex flex-align-center flex-space-between">
        <Link to="/"><div className="site-logo"></div></Link>
        <LoginControl />
      </div>
    </header>
	);
}

export default Header;
