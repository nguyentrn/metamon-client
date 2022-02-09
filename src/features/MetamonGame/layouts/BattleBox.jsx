import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import {
  selectBattleInfo,
  selectIsLoadingFighting,
} from "../../../redux/gameSlice";
import BattleInfo from "../components/BattleInfo";

const BattleBox = () => {
  const battle = useSelector(selectBattleInfo);
  const isLoadingFighting = useSelector(selectIsLoadingFighting);
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
      pos="relative"
      overflow="hidden"
    >
      {battle ? (
        <BattleInfo battle={battle} />
      ) : (
        <Text color="blackAlpha.600" fontSize="sm" fontWeight="semibold">
          Dữ liệu Battle
        </Text>
      )}
      {isLoadingFighting ? (
        <Flex pos="absolute" w="100%" h="100%" bg="blackAlpha.700">
          <Spinner m="auto" size="xl" color="whiteAlpha.900" />
        </Flex>
      ) : (
        ""
      )}
    </Flex>
  );
};

export default BattleBox;
