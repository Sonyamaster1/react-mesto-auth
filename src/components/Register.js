import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
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
  // отправялем форму
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="authen__form"
      noValidate
      name="register"
    >
      <h2 className="authen__title">Регистрация</h2>
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
        Зарегистрироваться
      </button>
      <div className="authen__signin">
        <Link to="/sign-in" className="authen__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  );
}
export default Register;
