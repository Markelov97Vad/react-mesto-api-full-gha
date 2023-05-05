import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo-mesto.svg';

function Header ({userEmail, handleLogin, children, isRender, menuIsOpen}) {

  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem('jwt');
    handleLogin();
    navigate('/sign-in', {replace: true});
  }

  return (
    <> 
      { isRender &&
        <nav className={`header__menu ${menuIsOpen && 'header__menu_close'}`}>
          <span className="header__menu-span">{userEmail}</span>
          <button className="header__menu-button" onClick={signOut}>Выйти</button>
        </nav>
      }
      <header className="header root__header">
        <img className='header__logo' src={logo} alt="Логотип: Место"/>
        {children}
      </header>
    </>
  )
}

export default Header;