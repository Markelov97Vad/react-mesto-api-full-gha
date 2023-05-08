import React, { useContext, useState } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import burgerMenu from '../images/icon-burger.svg'
import close from '../images/icon-close.svg'

function Main ({onEditProfile, onAddPlace, onEditAvatar , cards, handleLogin, userEmail, ...props}) {
  const currentUser = useContext(CurrentUserContext);
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem('jwt');
    handleLogin();
    navigate('/sign-in', {replace: true});
  }

  const handleMenuOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <>
      < Header isRender={true} handleMenuOpen={handleMenuOpen} userEmail={userEmail} handleLogin={handleLogin} menuIsOpen={menuIsOpen}>
          <nav className="header__nav header__nav_close">
            <span className="header__span">{userEmail}</span>
            <button className="header__button" onClick={signOut}>Выйти</button>
          </nav>
          <button type="button" style={{
            backgroundImage: `url(${menuIsOpen ? burgerMenu : close})`
          }} className='header__button-burger' onClick={handleMenuOpen}></button>
      </Header>

      <main className="content">
        <section className="profile content__profile">
          <div className="profile__card">
            <div className="profile__avatar">
              <img className="profile__avatar-img" src={currentUser.avatar} alt="аватарка"/>
              <button className="profile__avatar-button" onClick={onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button type="button" className="profile__edit-button" aria-label="edit profile"  onClick={onEditProfile}></button>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button className="profile__add-button" aria-label="edit card" onClick={onAddPlace}></button>
        </section>

        <section className="elements content__elements">
          {cards.map((card) => (
              < Card
                key={card._id}
                card={card}
                {...props}
              />
          ))}
        </section>
      </main>
    </>
  )
}

export default Main