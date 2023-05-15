import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormStateAndValid from "../hooks/useFormStateAndValid";

function CreateAvatarPopup ({ onUpdateAvatar, ...props}) {
  const { values, handleChange,errorMessages, formIsValid, resetFormValues } = useFormStateAndValid({});
  
  function handleSubmit (event) {
    event.preventDefault();
    
    onUpdateAvatar({
      avatar: values.avatar
    })
  }

  useEffect(() => {
    resetFormValues();
  },[props.isOpen])

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      isValid={formIsValid}
      {...props}
    >
      <input className="form__input" value={values.avatar || ''} onChange={handleChange} type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required/>
      <span id="avatar-error" className={`form__input-error ${(!formIsValid && props.isOpen) ? 'form__input-error_active' : '' }`}>{errorMessages.avatar}</span>
    </PopupWithForm>
  ) 
}

export default CreateAvatarPopup