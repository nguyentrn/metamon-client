import { Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { selectBattleInfo } from "../../../redux/gameSlice";
import BattleInfo from "../components/BattleInfo";

const BattleBox = () => {
  const battle = useSelector(selectBattleInfo);

  return (
    <Flex
      bg="white"
      p="2"
      justify="center"
      align="center"
      minW="12rem"
      minH="10rem"
      flexDir="column"
      borderRadius="3xl"
    >
      {battle ? (
        <BattleInfo battle={battle} />
      ) : (
        <Text color="blackAlpha.600" fontSize="sm" fontWeight="semibold">
          Dữ liệu Battle
        </Text>
      )}
    </Flex>
  );
};

export default BattleBox;
