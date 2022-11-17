import React from "react";
import pen from "../images/Vectoredit.svg";
import addBtn from "../images/Vector.svg";
import Card from "./Card.js";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__avatar"
          />
          <div className="profile__pen" onClick={props.onEditAvatar}></div>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__button-edit"
                onClick={props.onEditProfile}
              >
                <img src={pen} alt="Карандаш" className="profile__image-edit" />
              </button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__button-add"
            onClick={props.onAddPlace}
          >
            <img
              src={addBtn}
              alt="Кнопка добавления"
              className="profile__image-add"
            />
          </button>
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              {...card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;
