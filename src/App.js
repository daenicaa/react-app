import React from 'react';
import { BrowserRouter } from "react-router-dom";

import './App.css';
import './style/style.scss';

import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';

import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Main />
          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
