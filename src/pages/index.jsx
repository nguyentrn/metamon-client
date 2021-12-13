import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

import App from "../components/App";

export default function Index() {
  return (
    <App>
      <Flex
        pos="relative"
        flexDir="column"
        h="100vh"
        w="100vw"
        align="center"
        justify="center"
      >
        <Flex>
          <Link href="/skyeye">
            <Button size="lg" colorScheme="orange" m="1">
              SkyEye
            </Button>
          </Link>
          <Link href="/game">
            <Button size="lg" colorScheme="orange" m="1">
              MetamonAuto
            </Button>
          </Link>
        </Flex>
      </Flex>
    </App>
  );
}
