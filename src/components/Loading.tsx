import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

function Loading(): JSX.Element {
  return (
    <Center
      bgColor="gray.700"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="overlay"
    >
      <Spinner />
    </Center>
  );
}

export default Loading;
