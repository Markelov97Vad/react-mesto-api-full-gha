import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup ({isOpen, onClose, onAddPlace, onLoading}) {
  
  const {values, handleChange, setValues} = useForm({});

  function handleSubmit (event) {
    event.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link 
    })
  }

  useEffect(() => {
    setValues({})
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
        <span id="title-error" className="form__input-error">Вы пропустили это поле</span>
      <input className="form__input" type="url" value={values.link || ''}  onChange={handleChange} name="link" id="url" placeholder="Ссылка на картинку"
      required/>
      <span id="url-error" className="form__input-error">Вы пропустили это поле</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup