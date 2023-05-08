import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import Header from './Header';

function Login ({onLogin}) {
  const { values, handleChange } = useForm({})

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
          <input className='sign__input' autoComplete="new-email" type="email" name='email' value={values.email || ''} onChange={handleChange} required placeholder='Email'/>
          <input className='sign__input' autoComplete="new-password" type="password" name='password' value={values.password || ''} onChange={handleChange} required placeholder='Пароль'/>
          <button className='sign__button'  type="submit">Войти</button>
        </form>
      </div>
    </>  
   );
}

export default Login;