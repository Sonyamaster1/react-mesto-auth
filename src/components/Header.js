import React from "react";
import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

function Header({ onSignOut, headerEmail }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />

      <Route path="/sign-in">
        <Link to="sign-up" className="header__link">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link to="sign-in" className="header__link">
          Войти
        </Link>
      </Route>

      <Route exact path="/">
        <div className="header__container">
          <p className="header__email">{headerEmail}</p>
          <Link to="sign-in" className="header__exit" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}
export default Header;
