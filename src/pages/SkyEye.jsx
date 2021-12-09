import { Flex } from "@chakra-ui/react";

import Others from "../features/Others";
import Sidebar from "../features/Sidebar";

const Main = () => {
  return (
    <Flex
      pos="relative"
      flexDir="column"
      h="100vh"
      w="100vw"
      align="center"
      justify="center"
    >
      <Flex w="100vw" h="100vh">
        <Sidebar />
        <Others />
      </Flex>
    </Flex>
  );
};

export default Main;
