import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { Spinner } from "@chakra-ui/react";

import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {
  children: JSX.Element;
}

function PrivateRoute(props: Props): JSX.Element {
  const { ...rest } = props;

  const { user, loading } = useAuth();

  const lastLocation = localStorage.getItem("lastLocation");

  if (user) return <Redirect to={lastLocation || "/"} />;

  return loading ? (
    <Spinner />
  ) : (
    <Route
      {...rest}
      render={() => {
        localStorage.setItem("lastLocation", location.pathname);

        return <Redirect to={"/login"} />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
