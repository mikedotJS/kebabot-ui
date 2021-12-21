import React from "react";
import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

import { HStack, Icon, Text } from "@chakra-ui/react";

interface Props {
  icon: IconType;
  text: string;
  suffix?: JSX.Element;
  to: string;
}

export const SidebarItem = ({ icon, text, suffix, to }: Props): JSX.Element => {
  return (
    <HStack
      as={Link}
      to={to}
      py="1"
      px="2"
      borderRadius="md"
      _hover={{ bg: "gray.700" }}
      cursor="pointer"
      w="full"
    >
      <Icon as={icon}></Icon>
      <Text fontSize="sm">{text}</Text>
      {suffix}
    </HStack>
  );
};
