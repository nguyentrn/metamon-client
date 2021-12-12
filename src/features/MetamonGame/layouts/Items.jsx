import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectItems } from "../../../redux/gameSlice";

const Items = () => {
  const items = useSelector(selectItems);

  return (
    <Flex
      bg="whiteAlpha.900"
      p="2"
      w="30rem"
      minH="10%"
      // flexDir="column"
      justify="space-between"
      align="center"
      borderRadius="3xl"
      fontSize="xs"
      fontWeight="bold"
      color="blackAlpha.700"
    >
      {items
        ? items.map((item) => (
            <Flex>
              {item.name}: {item.bpNum}
            </Flex>
          ))
        : ""}
    </Flex>
  );
};

export default Items;
