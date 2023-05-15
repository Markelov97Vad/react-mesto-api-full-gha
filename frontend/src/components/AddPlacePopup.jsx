import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormStateAndValid from "../hooks/useFormStateAndValid";

function AddPlacePopup ({ isOpen, onClose, onAddCard, onLoading }) {
  
  const {values, handleChange, resetFormValues, formIsValid, errorMessages} = useFormStateAndValid({});

  function handleSubmit (event) {
    event.preventDefault();
    onAddCard({
      name: values.name,
      link: values.link 
    })
  }

  useEffect(() => {
    resetFormValues();
  },[isOpen])

  return (
    <PopupWithForm
      name='new-card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      buttonText='Создать'
      onSubmit={handleSubmit}
      onLoading={onLoading}
    >
      <input className="form__input" type="text" value={values.name || ''} onChange={handleChange} name="name" id="title" placeholder="Название"
      minLength="2" maxLength="30" required/>
      <span id="title-error" className={`form__input-error ${(!formIsValid && isOpen) ? 'form__input-error_active' : '' }`}>{errorMessages.name}</span>
      <input className="form__input" type="url" value={values.link || ''}  onChange={handleChange} name="link" id="url" placeholder="Ссылка на картинку"
      required/>
      <span id="url-error" className={`form__input-error ${(!formIsValid && isOpen) ? 'form__input-error_active' : '' }`}>{errorMessages.link}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup