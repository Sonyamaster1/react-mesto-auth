import like from "../images/Vector3.svg";
import trash from "../images/trash.svg";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  // мусорка
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__button-trash ${
    isOwn ? "element__button-trash_type_active" : ""
  }`;
  // лайк
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;
  // картинка
  function handleClick() {
    card.onCardClick(card);
  }
  // лайк
  function handleLikeClick() {
    card.onCardLike(card);
  }
  // удаление
  function handleDeleteClick() {
    card.onCardDelete(card);
  }
  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__text">
        <h2 className="element__title">{card.name}</h2>
        <button
          type="button"
          className="element__button-like"
          onClick={handleLikeClick}
        >
          <img
            src={like}
            alt="Иконка лайка"
            className={cardLikeButtonClassName}
          />
          <div className="element__like-counter">{card.likes.length}</div>
        </button>
      </div>
      <button
        type="reset"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      >
        <img src={trash} alt="Иконка мусорки" className="element__trash" />
      </button>
    </div>
  );
}
export default Card;
