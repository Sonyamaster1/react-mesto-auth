import React from "react";
import closeIcon from "../images/CloseIcon.svg";
function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_${props.name} ${
        props.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__text">{props.title}</h2>
        <form
          className={`popup__form popup__${props.form}`}
          onSubmit={props.onSubmit}
        >
          <fieldset className="popup__fieldset">
            {props.children}
            <button type="submit" className="popup__button">
              {props.buttonText}
            </button>
          </fieldset>
        </form>
        <button type="button" className="popup__close" onClick={props.onClose}>
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
