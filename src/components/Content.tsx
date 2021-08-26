import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Icon } from '@chakra-ui/react';

interface Props {
  children: JSX.Element;
}

export const Content = ({ children }: Props): JSX.Element => {
  const location = useLocation().pathname.split("/");
  const [, ...newLocation] = location;
  console.log(newLocation);

  const renderBreadcrumb = () => {
    const pathMap = {
      features: "Features",
      "reaction-roles": "Reaction roles",
      "tweet-alerter": "Twitter Alerter",
      notifs: "Notifications",
    };

    return newLocation.map((path, index) => {
      return (
        <BreadcrumbItem isCurrentPage={index === newLocation.length - 1}>
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
      >
        <Breadcrumb
          spacing="8px"
          separator={<Icon as={FiChevronRight} color="gray.500" />}
        >
          {renderBreadcrumb()}
        </Breadcrumb>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
