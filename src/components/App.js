import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import authApi from "../utils/AuthApi.js";

function App() {
  // попап редактирования
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  // попап добавления
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  // попап аватара
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  // попап удаления
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  // попап карточки
  const [selectedCard, setSelectedCard] = React.useState(null);
  // попап успешного входа
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  // current user
  const [currentUser, setCurrentUser] = React.useState({});
  // массив карточек
  const [cards, setCards] = React.useState([]);

  // 12 спринт
  // статус входа
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // попап успешного входа
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = React.useState(false);
  // хук история
  const history = useHistory();
  // email
  const [hederEmail, setHeaderEmail] = React.useState("");

  // попап редактирования
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // попап добавления
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // попап аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // попап карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsSuccessPopupOpen(false);
  }

  // получаем массив карточек и инфу пользователя
  React.useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);
  // like
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .getLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }
  // trash
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // update user
  function handleUpdateUser(data) {
    api
      .patchUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // update avatar
  function handleUpdateAvatar(data) {
    api
      .patchAvatarInfo(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // update cards
  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // закрытие по esc
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isSuccessPopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);
  // 12 спринт
  // регистрация пользователя
  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTolltipSuccess(true);
          history.push("/sing-in"); // переюрасываем на вход
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  // аутентификация пользователя
  function handleAuthUser(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          history.push("/"); // перебрасываем в профиль
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        setIsSuccessPopupOpen(true);
        console.log(err);
      });
  }
  // проверяем токен
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setHeaderEmail(data.data.email); // получаем почту
            history.push("/"); // перебрасываем в профиль
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);
  // удаляем токен
  function handleSingOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setIsLoggedIn(false);
    history.push("/sign-in"); // перебрасываем на вход
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header onSignOut={handleSingOut} headerEmail={hederEmail} />

          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoggedIn={isLoggedIn}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegisterUser} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleAuthUser} />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            title={"Вы уверены?"}
            buttonText={"Да"}
            name={"trash"}
          />
          <ImagePopup
            isOpen={selectedCard}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            name={"success"}
            onClose={closeAllPopups}
            isOpen={isSuccessPopupOpen}
            isSuccess={isInfoTolltipSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;