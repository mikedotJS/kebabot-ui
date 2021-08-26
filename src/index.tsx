import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react';

import { Layout } from './components/Layout';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Reactionroles from './components/Reactionroles';
import AuthProvider from './providers/AuthProvider';

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
            <Layout>
              {/* <PrivateRoute exact path="/">
            </PrivateRoute> */}
              <Switch>
                <PrivateRoute exact path="/Features/reaction-roles">
                  <Reactionroles />
                </PrivateRoute>
              </Switch>
            </Layout>
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
