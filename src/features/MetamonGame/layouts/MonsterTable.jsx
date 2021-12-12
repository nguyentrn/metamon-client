import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import MonsterList from "../containers/MonsterList";
import { selectMonsters } from "../../../redux/gameSlice";
import TableHeader from "../components/TableHeader";

const MonsterTable = () => {
  const monsters = useSelector(selectMonsters);

  return (
    <Flex
      bg="whiteAlpha.900"
      p="4"
      minW="50%"
      h="100%"
      flexDir="column"
      borderRadius="3xl"
      my="2"
    >
      <TableHeader />
      {monsters ? <MonsterList monsters={monsters} /> : ""}
    </Flex>
  );
};

export default MonsterTable;
