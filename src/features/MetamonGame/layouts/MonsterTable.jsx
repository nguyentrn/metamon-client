import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import MonsterList from "../containers/MonsterList";
import { selectMonsters, selectWinRatio } from "../../../redux/gameSlice";
import TableHeader from "../components/TableHeader";

const MonsterTable = () => {
  const monsters = useSelector(selectMonsters);
  const { win, total } = useSelector((state) => state.game);
  const winRatio = useSelector(selectWinRatio);

  return (
    <Flex
      bg="whiteAlpha.900"
      p="2"
      flexDir="column"
      borderRadius="xl"
      my="2"
      overflow="hidden"
      pos="relative"
    >
      <Flex pos="absolute" fontSize="xs" top="2" right="4">
        Tỉ lệ thắng {win}/{total} ({winRatio}%)
      </Flex>
      <TableHeader />
      {monsters ? <MonsterList monsters={monsters} /> : ""}
    </Flex>
  );
};

export default MonsterTable;
