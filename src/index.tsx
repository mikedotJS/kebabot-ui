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
        <Switch>
          <div>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/">
              <Layout>
                <div>Page principale à faire</div>
              </Layout>
            </PrivateRoute>
            <PrivateRoute path="/features/reaction-roles">
              <Layout>
                <ReactionRoles />
              </Layout>
            </PrivateRoute>
          </div>
        </Switch>
      </Router>
    </ChakraProvider>
  </AuthProvider>
);

ReactDom.render(<App />, document.getElementById("app"));
