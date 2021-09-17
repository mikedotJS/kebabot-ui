import React, { Children } from 'react';

import { Box } from '@chakra-ui/react';

import { Content } from './Content';
import { Sidebar } from './Sidebar';

interface Props {
  children: JSX.Element;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <Box w="full" h="full" display="flex" py={{ base: 4, sm: 4, "2xl": 8 }}>
      <Sidebar />
      <Content>{children}</Content>
    </Box>
  );
};
