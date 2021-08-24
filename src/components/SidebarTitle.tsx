import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  text: string;
}

export const SidebarTitle = ({ text }: Props): JSX.Element => {
  return (
    <Box px="2" py="1">
      <Text color="gray.400" fontSize="xs">
        {text}
      </Text>
    </Box>
  );
};
