import React from "react";
 class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
  // проверяет есть ли ошибка
  _checkError(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Статус ошибки: ${res.status}`);
  }
  // Загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // добавление карточек на страницу
  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // удаление карточек
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // получение данных с сервера
  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // изменение данных с сервера
  patchUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // изменение данных аватара
  patchAvatarInfo(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
  // добавление лайка
  getLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
  // удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
}
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    "content-type": "application/json",
    authorization: "35801359-77af-460b-835b-a39f894888d4",
  },
});
export default api;