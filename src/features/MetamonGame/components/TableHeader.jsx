import { Flex, Text } from "@chakra-ui/react";

// import AutoButton from "./AutoButton";

const TableHeader = () => {
  return (
    <Flex flexDir="column" justify="center">
      <Text textAlign="center" fontSize="2xl" my="4">
        Danh sách Metamon
      </Text>
      <Flex justify="flex-end">{/* <AutoButton /> */}</Flex>
    </Flex>
  );
};

export default TableHeader;
