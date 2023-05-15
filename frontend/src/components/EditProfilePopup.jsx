import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useFormStateAndValid from "../hooks/useFormStateAndValid";

function EditProfilePopup ({onUpdateUser, isOpen, ...props}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues, formIsValid, errorMessages} = useFormStateAndValid({});

  function handleSubmit (event) {
    event.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about
    })
  }

  useEffect(() => {
    setValues(currentUser);
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
        <span id="name-error" className={`form__input-error ${(!formIsValid && isOpen) ? 'form__input-error_active' : ''}`}>{errorMessages.name}</span>
        <input className="form__input" type="text" name="about" value={values.about || ''} onChange={handleChange} id="job" placeholder="Вид деятельности"
          minLength="2" maxLength="200" required/>
        <span id="job-error" className={`form__input-error ${(!formIsValid && isOpen) ? 'form__input-error_active' : ''}`}>{errorMessages.about}</span>
      </PopupWithForm>
  )
}

export default EditProfilePopup