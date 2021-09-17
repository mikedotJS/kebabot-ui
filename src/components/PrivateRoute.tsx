import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { Spinner } from "@chakra-ui/react";

import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {
  children: JSX.Element;
}

function PrivateRoute(props: Props): JSX.Element {
  const { children, ...rest } = props;

  const { api, user, loading } = useAuth();

  return loading ? (
    <Spinner />
  ) : (
    <Route
      {...rest}
      render={() => (!api || !user ? <Redirect to="/login" /> : children)}
    ></Route>
  );
}

export default PrivateRoute;
