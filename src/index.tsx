import { ChakraProvider, ThemeConfig } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
import React from "react";
import ReactDom from "react-dom";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

const App = () => (
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/">
              <Layout />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  </AuthProvider>
);

ReactDom.render(<App />, document.getElementById("app"));
