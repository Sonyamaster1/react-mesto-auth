import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="./sign-in" />
        )
      }
    </Route>
  );
}
