import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";

function EditProfilePopup ({onUpdateUser, isOpen, ...props}) {
  const currentUser = useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({});

  function handleSubmit (event) {
    event.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    })
  }

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, isOpen])

  return (
    <PopupWithForm 
      name='edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      {...props}
      >
        <input className="form__input" type="text" name="name" value={values.name || ''} onChange={handleChange} id="name" placeholder="Имя"
          minLength="2" maxLength="40" required/>
        <span id="name-error" className="form__input-error">Вы пропустили это поле</span>
        <input className="form__input" type="text" name="about" value={values.about || ''} onChange={handleChange} id="job" placeholder="Вид деятельности"
          minLength="2" maxLength="200" required/>
        <span id="job-error" className="form__input-error">Вы пропустили это поле</span>
      </PopupWithForm>
  )
}

export default EditProfilePopup