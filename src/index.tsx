import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

import { Layout } from "./components/Layout";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { ReactionRoles } from "./components/ReactionRoles";
import AuthProvider from "./providers/AuthProvider";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

const App = () => (
  <AuthProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Layout>
            <Switch>
              <PrivateRoute exact path="/">
                <div>Page principale à faire</div>
              </PrivateRoute>
              <PrivateRoute path="/features/reaction-roles">
                <ReactionRoles />
              </PrivateRoute>
            </Switch>
          </Layout>
          <Route path="/login">
            <Login />
          </Route>
        </div>
      </Router>
    </ChakraProvider>
  </AuthProvider>
);

ReactDom.render(<App />, document.getElementById("app"));
