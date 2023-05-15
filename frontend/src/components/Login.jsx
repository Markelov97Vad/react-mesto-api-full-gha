import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFormStateAndValid from '../hooks/useFormStateAndValid';
import Header from './Header';

function Login ({ onLogin }) {
  const { values, handleChange, errorMessages, resetFormValues } = useFormStateAndValid({});

  useEffect(() => {
    resetFormValues();
  }, []);

  const handlSubmit = (event) => {
    event.preventDefault();
    const { email, password } = values

    if (!email || !password) {
      return
    }
    onLogin({ password, email });
  }

  return (
    <>
      <Header>
        <Link to='/sign-up' className="header__link">Регистрация</Link>
      </Header>

      <div className="sign">
        <p className="sign__title">Вход</p>
        <form className="sign__form" onSubmit={handlSubmit}>
          <input id='email-input' className='sign__input' autoComplete="new-email" type="email" name='email' value={values.email || ''} onChange={handleChange} required placeholder='Email'/>
          <span className='sign__input-error'>{errorMessages.email}</span>
          <input id='password-input' className='sign__input' autoComplete="new-password" type="password" name='password' value={values.password || ''} onChange={handleChange} required placeholder='Пароль'/>
          <span className='sign__input-error'>{errorMessages.password}</span>
          <button className='sign__button' type="submit">Войти</button>
        </form>
      </div>
    </>  
   );
}

export default Login;