import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import { Box, Flex, IconButton, Input, Textarea, VStack } from '@chakra-ui/react';

export const Reactionroles = (): JSX.Element => {
  return (
    <Box>
      <VStack>
        <Textarea>Hi there</Textarea>
        <Input placeholder="Role Name" size="sm" />
      </VStack>
    </Box>
  );
};
