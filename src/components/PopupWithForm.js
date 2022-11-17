import React from "react";
import closeIcon from "../images/CloseIcon.svg";
function PopupWithForm({
  name,
  isOpen,
  title,
  form,
  onSubmit,
  buttonText,
  onClose,
  children,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <h2 className="popup__text">{title}</h2>
        <form className={`popup__form popup__${form}`} onSubmit={onSubmit}>
          <fieldset className="popup__fieldset">
            {children}
            <button type="submit" className="popup__button">
              {buttonText}
            </button>
          </fieldset>
        </form>
        <button type="button" className="popup__close" onClick={onClose}>
          <img
            src={closeIcon}
            alt="закрывающий крестик"
            className="popup__close-image"
          />
        </button>
      </div>
    </div>
  );
}
export default PopupWithForm;
