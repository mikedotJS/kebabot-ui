import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";

interface Props {
  children: JSX.Element;
}

export const Content = ({ children }: Props): JSX.Element => {
  const location = useLocation();
  const splittedLocation = location.pathname.split("/");
  const [, ...paths] = splittedLocation;

  const renderBreadcrumbItems = () => {
    const pathMap = {
      features: "Features",
      "reaction-roles": "Reaction roles",
      "tweet-alerter": "Twitter Alerter",
      notifications: "Notifications",
    };

    return paths.map((path, index) => {
      return (
        <BreadcrumbItem isCurrentPage={index === paths.length - 1}>
          <BreadcrumbLink>{pathMap[path]}</BreadcrumbLink>
        </BreadcrumbItem>
      );
    });
  };

  return (
    <Box borderRadius="md" h="full" w="full" pr={{ base: 4, sm: 4, "2xl": 8 }}>
      <Box
        borderRadius="md"
        h="full"
        w="full"
        bg="gray.700"
        p={{ base: 4, sm: 4, "2xl": 8 }}
        overflow="hidden"
      >
        <Breadcrumb
          spacing="8px"
          separator={<Icon as={FiChevronRight} color="gray.500" />}
        >
          {renderBreadcrumbItems()}
        </Breadcrumb>
        <Box h="full">{children}</Box>
      </Box>
    </Box>
  );
};
