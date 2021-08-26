import React from "react";
import { AuthContextProvider } from "../hooks/useAuth";

interface Props {
  children: JSX.Element;
}

function AuthProvider(props: Props): JSX.Element {
  const { children } = props;

  return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default AuthProvider;
