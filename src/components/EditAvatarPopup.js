import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }
  // clean inputs
  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Обновить аватар"}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      name={"avatar"}
      form={"avatar-form"}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        autoComplete="off"
        id="avatar-input"
        minLength="2"
        required
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
