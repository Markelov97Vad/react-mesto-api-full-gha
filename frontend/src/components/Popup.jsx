import { useEffect } from "react";

function Popup({isOpen, name, onClose, children , isRender}) {

  useEffect(() => {
    if (!isOpen) return;

    const closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div 
      className={`popup popup_theme_${name} ${isOpen ? "popup_opened" : ""}`} 
      onClick={handleOverlay}
    >
      <div 
        className={`${isRender ? `popup__container_type_${name}` : 'popup__container'}`}
      >
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        {children}
      </div>
    </div>
  );
}

export default Popup;