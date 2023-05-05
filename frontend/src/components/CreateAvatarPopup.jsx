import React, { useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function CreateAvatarPopup ({ onUpdateAvatar, ...props}) {

  const avatarRef = useRef();
  
  function handleSubmit (event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  useEffect(() => {
    avatarRef.current.value = '';
  },[props.isOpen])

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      {...props}
    >
      <input className="form__input" ref={avatarRef} type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" required/>
      <span id="avatar-error" className="form__input-error"></span>
    </PopupWithForm>
  ) 
}

export default CreateAvatarPopup