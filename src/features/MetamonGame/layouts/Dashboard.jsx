/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";

import useInitData from "../hooks/useInitData";
import BattleBox from "./BattleBox";
import Items from "./Items";
import MonsterTable from "./MonsterTable";

const Dashboard = () => {
  useInitData();

  return (
    <Flex
      align="center"
      justify="space-between"
      flexDir="column"
      w="100vw"
      p="1"
      overflow="hidden"
    >
      <Items />
      <MonsterTable />
      <BattleBox />
    </Flex>
  );
};

export default Dashboard;
