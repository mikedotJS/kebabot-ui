import { ChakraProvider, ThemeConfig } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
import React from "react";
import ReactDom from "react-dom";
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Layout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  </ChakraProvider>
);

ReactDom.render(<App />, document.getElementById("app"));
