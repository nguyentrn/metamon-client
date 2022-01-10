import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectItems } from "../../../redux/gameSlice";

const Items = () => {
  const items = useSelector(selectItems);
  return (
    <Flex
      bg="whiteAlpha.900"
      px="2"
      w="30rem"
      minH="2rem"
      // flexDir="column"
      justify="space-between"
      align="center"
      borderRadius="sm"
      fontSize="xs"
      fontWeight="bold"
      color="blackAlpha.700"
    >
      {items
        ? items.map((item) => (
            <Flex key={item.bpType}>
              {item.name}: {item.bpNum}
            </Flex>
          ))
        : ""}
    </Flex>
  );
};

export default Items;
