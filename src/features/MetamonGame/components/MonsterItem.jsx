/* eslint-disable react/prop-types */
import { Image, Tr, Td, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { selectIsLoadingGame, startOneBattle } from "../../../redux/gameSlice";

// const monsterAtts = [
//   { label: 'Luck', attr: 'luk' },
//   { label: 'Courage', attr: 'crg' },
//   { label: 'Wisdom', attr: 'inte' },
//   { label: 'Size', attr: 'con' },
//   { label: 'Stealth', attr: 'inv' },
// ];

const MonsterItem = ({ monster }) => {
  const dispatch = useDispatch();
  const isLoadingGame = useSelector(selectIsLoadingGame);

  const handleFightOne = () => {
    dispatch(startOneBattle(monster));
  };

  return (
    <Tr>
      <Td p="0">
        <Image
          src={monster.imageUrl}
          w="4rem"
          h="4rem"
          alignSelf="center"
          justifySelf="center"
        />
      </Td>
      <Td>{monster.id}</Td>
      <Td>Lvl.{monster.level}</Td>
      <Td>{monster.sca}</Td>
      <Td>
        {monster.exp}/{monster.expMax}
      </Td>
      <Td>{monster.tear} / 20</Td>
      <Td>
        <Button
          // disabled={!monster.tear}
          size="sm"
          colorScheme="green"
          onClick={handleFightOne}
          isLoading={isLoadingGame}
          loadingText="Fighting"
        >
          Fight One
        </Button>
      </Td>
    </Tr>
  );
};

export default MonsterItem;
