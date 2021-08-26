import { Spinner } from "@chakra-ui/react";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface Props extends RouteProps {
  children: JSX.Element;
}

function PrivateRoute(props: Props) {
  const { children, ...rest } = props;

  const { api, user, loading } = useAuth();

  return loading ? (
    <Spinner />
  ) : (
    <Route
      {...rest}
      render={(props) => (!api || !user ? <Redirect to="/login" /> : children)}
    ></Route>
  );
}

export default PrivateRoute;
