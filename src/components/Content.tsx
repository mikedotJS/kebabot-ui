import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

export const Content = (): JSX.Element => {
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
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Features</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Reaction Roles</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
    </Box>
  );
};
