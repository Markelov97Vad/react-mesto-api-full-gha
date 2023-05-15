import React from "react";
import Popup from "./Popup";

function PopupWithForm ({name, isOpen, onClose, onSubmit, buttonText, children, title, onLoading, isValid = true}) {

  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <h3 className="popup__title">{title}</h3>
        <form onSubmit={onSubmit} className="form popup__form" name={`${name}`} noValidate>
          {children}
          <button type='submit' className='form__submit-button' disabled={!isValid}>{onLoading ? 'Сохранение..' : buttonText}</button>
        </form>
    </Popup>
  )
}

export default PopupWithForm