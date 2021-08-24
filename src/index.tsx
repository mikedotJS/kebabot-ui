import { ChakraProvider, ThemeConfig } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
import React from "react";
import ReactDom from "react-dom";
import { extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

const App = () => (
  <ChakraProvider theme={theme}>
    <Layout />
  </ChakraProvider>
);

ReactDom.render(<App />, document.getElementById("app"));
