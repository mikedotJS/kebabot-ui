import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

interface Props extends RouteProps {
  children: JSX.Element;
}

function PrivateRoute(props: Props): JSX.Element {
  const { children, ...rest } = props;

  const { user, loading } = useAuth();

  return loading ? (
    <Loading />
  ) : (
    <Route
      {...rest}
      render={() => {
        if (!user) localStorage.setItem("lastLocation", location.pathname);
        return user ? children : <Redirect to={"/login"} />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
