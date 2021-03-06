/* eslint-disable react/prop-types */
import { Image, Tr, Td, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectIsLoadingFighting,
  startOneBattle,
  updateMonster,
} from "../../../redux/gameSlice";

// const monsterAtts = [
//   { label: 'Luck', attr: 'luk' },
//   { label: 'Courage', attr: 'crg' },
//   { label: 'Wisdom', attr: 'inte' },
//   { label: 'Size', attr: 'con' },
//   { label: 'Stealth', attr: 'inv' },
// ];

const MonsterItem = ({ monster }) => {
  const dispatch = useDispatch();
  const isLoadingFight = useSelector(selectIsLoadingFighting);

  const handleFightOne = () => {
    dispatch(startOneBattle(monster));
  };

  const handleUpdateMonster = () => {
    dispatch(updateMonster(monster.id));
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
          disabled={!monster.tear}
          size="sm"
          colorScheme="green"
          onClick={handleFightOne}
          isLoading={isLoadingFight}
          loadingText="Fighting"
        >
          Fight One
        </Button>
      </Td>
      <Td>
        <Button
          disabled={monster.exp < monster.expMax}
          size="sm"
          colorScheme="green"
          onClick={handleUpdateMonster}
        >
          Level Up
        </Button>
      </Td>
    </Tr>
  );
};

export default MonsterItem;
