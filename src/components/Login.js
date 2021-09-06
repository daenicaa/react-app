import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Register from './Register';
import { useForm } from '../util/hooks';
import { AuthContext } from '../context/auth';
import { LOGIN_MUTATION } from '../graphql/queries';
import { useMutation } from '@apollo/client';


function Login(){
  const history = useHistory();
  const [currentView, setCurrentView] = useState('logIn');
  const [showForm, setShowForm] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [errors, setErrors] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cssClasses = [ 'form flex flex-center', showForm ? 'formOpened': 'formClosed' ];

  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user.token) {
      setIsLoggedIn(true)
    }
  }, [user])

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    update(_, { data: { authenticate: token } }) {
      if (token) {
        localStorage.setItem('token', token)
        setIsLoggedIn(true)
        setShowForm(false);
        window.location.reload();
      }
      else {
        setErrors('Incorrect password or email!');
      }
    },
    pollInterval: 500,
    variables: {
      email: values.email,
      password: values.password
    }
  })

  function loginUserCallback() {
    loginUser();
  }

  function handleChangeView(e){
    e.preventDefault();
    let view = e.target.classList[0] == 'register' ? 'register' : 'logIn'
    setCurrentView(view)
  }

  function toggleLogoutModal(e){
    e.preventDefault();
    setLogoutModalOpen(true)
	};

  function closeLogoutModal(){
		setLogoutModalOpen(false);
	};

  function handleLogout(){
    if (user) {
      logout();
      setIsLoggedIn(false)
      setShowForm(false);
    }
    //setModalIsOpen(false);
    setLogoutModalOpen(false);
    history.push('/');
    window.location.reload();
  }

  function handleRegister(){
    if (user) {
      logout();
      setIsLoggedIn(false)
    }
  }

   function handleShowForm(e){
    setShowForm(true);
  }

  function handleCloseFormClick() {
    setShowForm(false);
  }

  // function cancelEditTrigger(e){
	// 	e.preventDefault();
	// 	//$(".mask").addClass("active");
	// }

	// function closeAlertModal(){
	// 	$(".mask").removeClass("active");
	// }

  function handleCurrentView() {
    if (currentView === 'logIn') {
      return (
        <form className={cssClasses.join(' ')} noValidate onSubmit={handleSubmit}>
          <div className="form-login">
            <h2 className="form-header">LOGIN</h2>
            <div className="form-group">
              <label className="form-label text-left">Email</label>
              <input className="form-control" type="email" name="email" onChange={handleChange} required/>
            </div>
            <div className="form-group">
              <label className="form-label text-left">Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} required />
            </div>
            <p className="alert danger">{errors}</p>
            <button className="button button-dark">
              LOGIN
            </button>
            <div className="form-registration u-align-center">
              No account yet? <button type="button" className="register login-register-btn" onClick={handleChangeView}>REGISTER HERE</button>
            </div>
          </div>
        </form>
      )
    } else {
      return (
        <Register clicked={handleChangeView} register={handleRegister} cssClasses={cssClasses}/>
      )
    }
  }

  let button;

  if (isLoggedIn) {
    button = <button className="form-header" onClick={toggleLogoutModal}>LOGOUT</button>;
  } else if (showForm){
    button = <button className="form-header" onClick={handleCloseFormClick}>CLOSE</button>;
  } else {
    button = <button className="form-header" onClick={handleShowForm}>LOGIN</button>;
  }

  return (
    <div>
      { button }
      { showForm ? handleCurrentView() : null}
      { isLogoutModalOpen ?
        <div>
          <div role="dialog" className={`mask ${isLogoutModalOpen ? "active" : ""}`}></div>
          <div className="modal" role="alert">
            <h2>Are you sure you want to logout?</h2>
            <div className="row flex-space-between">
              <button className="col-lg-6 button button-dark" onClick={handleLogout}>Yes</button>
              <button className="col-lg-5 button" onClick={closeLogoutModal}>No</button>
            </div>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Login;
