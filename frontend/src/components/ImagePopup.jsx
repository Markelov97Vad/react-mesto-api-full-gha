import React from "react";
import Popup from "./Popup";

function ImagePopup ({ isOpen, card, onClose}) {
  return (
    < Popup isRender={true} isOpen={isOpen} name='figure' onClose={onClose}>
        <button type="button" aria-label="close the pop-up" className="popup__close-button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name}/>
          <figcaption className="popup__figcap">{card.name}</figcaption>
        </figure>
    </Popup>
  )
}

export default ImagePopup
