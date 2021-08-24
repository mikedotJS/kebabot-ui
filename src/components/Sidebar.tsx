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
import {
  FiBell,
  FiChevronDown,
  FiHome,
  FiSettings,
  FiThumbsUp,
  FiTwitter,
} from "react-icons/fi";
import React from "react";
import { SidebarItem } from "./SidebarItem";
import { SidebarTitle } from "./SidebarTitle";

export const Sidebar = (): JSX.Element => {
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
              LK
            </Center>
          }
          pl="2"
        >
          La Kébaberie
        </MenuButton>
        <MenuList>
          <MenuItem>Log out</MenuItem>
        </MenuList>
      </Menu>

      <Box w="full">
        <SidebarItem icon={FiHome} text="Dashboard" />
        <SidebarItem
          icon={FiBell}
          text="Notifications"
          suffix={
            <Tag color="white" bg="red.400" size="sm">
              2
            </Tag>
          }
        />
      </Box>

      <Box w="full">
        <SidebarTitle text="FEATURES" />

        <Box>
          <SidebarItem icon={FiThumbsUp} text="Reaction Roles" />
          <SidebarItem icon={FiTwitter} text="Tweet Alerter" />
        </Box>
      </Box>

      <Spacer />

      <SidebarItem icon={FiSettings} text="Settings" />
    </VStack>
  );
};
