import { HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";

interface Props {
  icon: IconType;
  text: string;
  suffix?: JSX.Element;
}

export const SidebarItem = ({ icon, text, suffix }: Props): JSX.Element => {
  return (
    <HStack
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
