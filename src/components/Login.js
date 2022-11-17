import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Login({ isLoggedIn, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // меняем инпут
  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  // меняем инпут
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }
  // отправляем форму
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="authen__form" noValidate>
      <h2 className="authen__title">Вход</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="authen__input"
        onChange={handleEmailChange}
        autoComplete="off"
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        className="authen__input"
        onChange={handlePasswordChange}
        autoComplete="off"
      />

      <button type="submit" className="authen__btn">
        Войти
      </button>
    </form>
  );
}
export default Login;
