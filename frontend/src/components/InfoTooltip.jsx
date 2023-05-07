import React from 'react';
import successImg from '../images/success.png';
import errorImg from '../images/error.svg';
import Popup from './Popup';

function InfoTooltip({onIsResultSucces, onMessage, isTooltipOpen, onClose, loggetIn}) {
  
  return (
    <> 
      <Popup name='result' isOpen={isTooltipOpen} onClose={onClose} >
        <img src={onIsResultSucces ? successImg : errorImg} alt="Успех" className="popup-result__image" />
        <p className='popup-result__title'>{onMessage}</p>
      </Popup>
    </>
  )
}

export default InfoTooltip;
