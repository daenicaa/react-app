import React, { useState } from "react";

function Login(props) {
  const isLoggedIn = props.state.isLoggedIn;
  const showRegister = props.state.showRegister;
  const isOpenForm = props.state.isOpenForm;

  //inner states
  const [state, setState] = useState(
    { isFormOpen: false, showRegister: false, fade: false }
  );
  const cssClasses = [ 'form flex flex-center', state.fade ? 'formOpened': 'formClosed' ];

  let button;

  function handleLoginClick(e){
    e.preventDefault();
    props.handleLoginClick();
    setState({ isOpenForm: false, fade: false });
  }
  function handleLogoutClick(){
    props.handleLogoutClick();
    setState({ isOpenForm: false, showRegister: false });
  }

  function handleRegisterClick(e){
    e.preventDefault();
    props.handleRegisterClick();
  }

  function handleOpenFormClick() {
    setState({isOpenForm: true, fade: true});
  }

  function handleCloseFormClick() {
    setState({isOpenForm: false, fade: false});
  }

  function showRegisterModal() {
    let value = !state.showRegister
    setState({ showRegister: value, isOpenForm: true, fade: true })
  }

  if (isLoggedIn) {
    button = <button onClick={handleLogoutClick}>LOGOUT</button>;
  } else if (state.isOpenForm){
    button = <button onClick={handleCloseFormClick}>CLOSE</button>;
  } else {
    button = <button onClick={handleOpenFormClick}>LOGIN</button>;
  }

    return (
      <div>
      {button}
      {state.showRegister ? (
        <form className={cssClasses.join(' ')}>
          <div className="form-login">
            <h2 className="form-header">REGISTER</h2>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-control" type="email"/>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-control" type="password"/>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-control" type="password"/>
            </div>
            <button className="button button-dark" onClick={handleRegisterClick}>
              REGISTER
            </button>
            <div className="form-registration u-align-center">
              Already have an account? <a onClick={showRegisterModal}><strong>LOGIN HERE</strong></a>
            </div>
          </div>
        </form>
      ) : (
        <form className={cssClasses.join(' ')}>
          <div className="form-login">
            <h2 className="form-header">LOGIN</h2>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-control" type="email"/>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-control" type="password"/>
            </div>
            <button className="button button-dark" onClick={handleLoginClick}>
              LOGIN
            </button>
            <div className="form-registration u-align-center">
              No account yet? <a onClick={showRegisterModal}><strong>REGISTER HERE</strong></a>
            </div>
          </div>
        </form>
      )}
      </div>
    );

}

export default Login;
