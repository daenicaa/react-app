import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from '../util/hooks';
import { REGISTER_USER } from '../graphql/queries'

function Register(props){
  const [errors, setErrors] = useState({});
  const [success, isSuccess] = useState('');
  const cssClasses = props.cssClasses;

  const { handleChange, handleSubmit, values } = useForm(registerUser, {
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [addUser] = useMutation(REGISTER_USER, {
      update(_, {data: { register: registered, authenticate: token }}){
          if(registered){
            localStorage.setItem('token', token)
            isSuccess('Succesfully Registered!')
            props.register();
          }
      },
      onError(err){
        console.log('err', err)
        setErrors(err.graphQLErrors[0].extensions.exception.errors)
      },
      variables: {
         email: values.email,
         password: values.password,
         confirmPassword: values.confirmPassword
     }
  })

  function registerUser() {
    addUser();
  }

  return (
    <form className={cssClasses.join(' ')} noValidate onSubmit={handleSubmit}>
      <div className="form-login">
        <h2 className="form-header">REGISTER</h2>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required=""
            className="form-control"/>
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            required=""
            value={values.password}
            onChange={handleChange}
            className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required=""
            value={values.confirmPassword}
            onChange={handleChange}
            className="form-control" />
        </div>
        <p className="success">{success}</p>
        { errors.length > 0 && (
          <div className="error">
            <ul className="error-list">
              { errors.map(({ message }) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
        )}
        <button type="submit" className="button button-dark">
          REGISTER
        </button>
        <div className="form-registration u-align-center">
          Already have an account? <button className="login-register-btn" type="button" onClick={props.clicked}>LOGIN HERE</button>
        </div>
      </div>
    </form>
  )
}


export default Register;
