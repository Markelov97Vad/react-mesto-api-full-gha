import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation ({isOpen, card, onSubmit, ...props}) {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card)
  }

  return (
    <PopupWithForm 
      name='delete-card' 
      title='Вы уверены?'
      isOpen={isOpen}
      buttonText='Да'
      onSubmit={handleSubmit}
      {...props}
    />
  )
}

export default PopupWithConfirmation