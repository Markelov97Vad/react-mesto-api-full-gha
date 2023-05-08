import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Header from './Header';

function Register ({onRegister}) {

  const {values, handleChange} = useForm({})

  const handleSubmit = (event) => {
    event.preventDefault();
    const {email, password} = values

    onRegister({password, email});
  }

  return (
    <>
      <Header>
        <Link to='/sign-in' className="header__link">Войти</Link>
      </Header>

      <div className="sign">
        <p className="sign__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="sign__form">
          <input className='sign__input' autoComplete="new-email" type="email" name='email' value={values.email || ''} onChange={handleChange} required placeholder='Email'/>
          <input className='sign__input' autoComplete="new-password" type="password" name='password' value={values.password || ''} onChange={handleChange} required placeholder='Пароль'/>
          <button className='sign__button' type="submit">Зарегистрироваться</button>
          <p className='sign__subtitle'>Уже зарегистрированы? <Link className="sign__link" to="/sign-in">Войти</Link></p>
        </form>
      </div>
    </>
   );
}

export default Register;