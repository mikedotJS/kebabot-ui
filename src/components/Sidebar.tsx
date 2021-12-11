import React from "react";
import {
  FiBell,
  FiChevronDown,
  FiHome,
  FiSettings,
  FiThumbsUp,
  FiTwitter,
} from "react-icons/fi";

import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Tag,
  VStack,
} from "@chakra-ui/react";

import { SidebarItem } from "./SidebarItem";
import { SidebarTitle } from "./SidebarTitle";
import { useAuth } from "../hooks/useAuth";
import _ from "lodash";

export const Sidebar = (): JSX.Element => {
  const { logout, user } = useAuth();

  return (
    <VStack
      w="xs"
      px={{ base: 4, sm: 4, "2xl": 8 }}
      alignItems="flex-start"
      justifyContent="flex-start"
      spacing="4"
      h="full"
    >
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<FiChevronDown />}
          leftIcon={
            <Center w="6" h="6" borderRadius="md" bg="green.400" fontSize="xs">
              {user.guild_name
                .split(" ")
                .map((word) => _.truncate(word, { length: 1, omission: "" }))
                .join("")}
            </Center>
          }
          pl="2"
        >
          {user.guild_name}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => logout()}>Log out</MenuItem>
        </MenuList>
      </Menu>

      <Box w="full">
        <SidebarItem icon={FiHome} text="Dashboard" to="/" />
        <SidebarItem
          icon={FiBell}
          text="Notifications"
          suffix={
            <Tag color="white" bg="red.400" size="sm">
              2
            </Tag>
          }
          to="/notifications"
        />
      </Box>

      <Box w="full">
        <SidebarTitle text="FEATURES" />

        <Box>
          <SidebarItem
            icon={FiThumbsUp}
            text="Reaction Roles"
            to="/features/reaction-roles"
          />
          <SidebarItem
            icon={FiTwitter}
            text="Tweet Alerter"
            to="/features/tweet-alerter"
          />
        </Box>
      </Box>

      <Spacer />

      <SidebarItem icon={FiSettings} text="Settings" to="/settings" />
    </VStack>
  );
};
