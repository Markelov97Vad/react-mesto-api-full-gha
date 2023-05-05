import React from 'react';
import successImg from '../images/success.svg';
import errorImg from '../images/error.svg';
import Popup from './Popup';


function InfoTooltip({onRegisterValue, isTooltipOpen, onClose}) {

  return (
    <Popup name='result' isOpen={isTooltipOpen} onClose={onClose} >
      <img src={onRegisterValue ? successImg : errorImg} alt="Успех" className="popup-result__image" />
      <p className='popup-result__title'>{onRegisterValue ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }</p>
    </Popup>
  )
}

export default InfoTooltip;