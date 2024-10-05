import React from "react";
import { getDecodedToken } from "../Utils/DecodedToken";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  return getDecodedToken() !== null;
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default ProtectedRoute;
