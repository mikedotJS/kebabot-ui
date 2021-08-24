import { Box } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import React from "react";
import { Content } from "./Content";

export const Layout = (): JSX.Element => {
  return (
    <Box w="full" h="full" display="flex" py={{ base: 4, sm: 4, "2xl": 8 }}>
      <Sidebar />
      <Content />
    </Box>
  );
};
