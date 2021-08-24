import { Box } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import React from "react";

export const Layout = (): JSX.Element => {
  return (
    <Box w="full" h="full">
      <Sidebar />
    </Box>
  );
};
