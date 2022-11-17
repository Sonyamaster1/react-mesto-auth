import React from "react";
import closeIcon from "../images/CloseIcon.svg";
function InfoTooltip({ onClose, name, isOpen, isSuccess }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <div
          className={`popup__success ${
            isSuccess ? "popup__success_type_ok" : "popup__success_type_fail"
          }`}
        ></div>
        <h2 className="popup__title">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>
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
export default InfoTooltip;
