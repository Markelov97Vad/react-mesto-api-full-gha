import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import useFormStateAndValid from '../hooks/useFormStateAndValid';

function Register ({onRegister}) {

  const {values, handleChange , resetFormValues, errorMessages } = useFormStateAndValid({})

  const handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = values

    onRegister({ password, email });
  }

  useEffect(() => {
    resetFormValues();
  }, []);

  return (
    <>
      <Header>
        <Link to='/sign-in' className="header__link">Войти</Link>
      </Header>

      <div className="sign">
        <p className="sign__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="sign__form">
          <input className='sign__input' autoComplete="new-email" type="email" name='email' value={values.email || ''} onChange={handleChange} required placeholder='Email'/>
          <span className='sign__input-error'>{errorMessages.email}</span>
          <input className='sign__input' autoComplete="new-password" type="password" name='password' value={values.password || ''} onChange={handleChange} required placeholder='Пароль'/>
          <span className='sign__input-error'>{errorMessages.password}</span>
          <button className='sign__button' type="submit">Зарегистрироваться</button>
          <p className='sign__subtitle'>Уже зарегистрированы? <Link className="sign__link" to="/sign-in">Войти</Link></p>
        </form>
      </div>
    </>
   );
}

export default Register;