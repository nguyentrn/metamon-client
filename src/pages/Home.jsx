import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Flex
      pos="relative"
      flexDir="column"
      h="100vh"
      w="100vw"
      align="center"
      justify="center"
    >
      <Flex>
        <Link to="skyeye">
          <Button size="lg" colorScheme="orange" m="1">
            SkyEye
          </Button>
        </Link>
        <Link to="game">
          <Button size="lg" colorScheme="orange" m="1">
            MetamonAuto
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
