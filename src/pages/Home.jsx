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
      {/* <Background /> */}
      <Flex>
        <Link to="skyeye">
          <Button size="lg" colorScheme="green">
            SkyEye
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Home;
