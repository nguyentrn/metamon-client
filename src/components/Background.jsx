import { Flex } from "@chakra-ui/react";

const Background = () => {
  return (
    <Flex
      pos="fixed"
      zIndex="-1"
      background={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/background.jpeg') center center/cover no-repeat`}
      w="100%"
      h="100%"
    />
  );
};

export default Background;
