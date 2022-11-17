import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onSubmit, isOpen, onClose, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  // input change
  function handleNameChange(e) {
    setName(e.target.value);
  }
  // input change
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }
  // clean inputs
  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Новое место"}
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      name={"cards"}
      form={"cards-form"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_image"
        type="text"
        name="image"
        id="image-input"
        autoComplete="off"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleNameChange}
        value={name}
      />
      <span className="popup__error image-input-error"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        id="link-input"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
