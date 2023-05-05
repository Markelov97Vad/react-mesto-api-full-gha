import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some(elId => elId._id === currentUser._id);
  const cardLikeButtonClassname = `element__button ${isLiked ? 'element__button_active' : ''}`
  

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLike = () => {
    onCardLike(card)
  }

  const handleDelete = () => {
    onCardDelete(card._id)
  }

  return (
    <article className="element">
      {isOwn && <button className="element__delete-button" type="button" onClick={handleDelete} aria-label="delete card"></button>}
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <span className="element__like">
          <button type="button" className={cardLikeButtonClassname} onClick={handleLike} aria-label="mark like"></button>
          <span className="element__number-of-likes">{card.likes.length}</span>
        </span>
      </div>
    </article>
  )
}

export default Card