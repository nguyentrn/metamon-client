import { Badge, Flex, Image, Text } from '@chakra-ui/react';

const BattleMonster = ({ monster }) => {
  return (
    <Flex flexDir="column" align="center">
      <Image src={monster.imageUrl} w="20" h="20" />
      <Flex>
        <Badge>Lvl.{monster.level}</Badge>
        <Badge ml="1">Score: {monster.sca}</Badge>
      </Flex>
      <Flex>
        <Badge>{monster.rarity}</Badge>
        <Badge ml="1">{monster.race}</Badge>
      </Flex>
    </Flex>
  );
};

const Battle = ({ battle }) => {
  return (
    <Flex flexDir="column" align="center">
      <Flex whiteSpace="pre">
        <Text
          fontWeight="bold"
          color={battle.challengeResult ? 'green.500' : 'red.500'}
        >
          {battle.challengeResult ? 'Thắng' : 'Thua'}
        </Text>
        . Thu được{' '}
        <Text
          fontWeight="bold"
          color={battle.challengeResult ? 'green.500' : 'red.500'}
        >
          {battle.bpFragmentNum} mảnh trứng
        </Text>
      </Flex>
      <Flex w="20rem" m="2" align="center" justify="space-around">
        <BattleMonster monster={battle.challengeMonster} />
        <Flex alignSelf="center" m="1" fontSize="1.5rem" fontWeight="bold">
          VS{' '}
        </Flex>
        <BattleMonster monster={battle.challengedMonster} />
      </Flex>
    </Flex>
  );
};

export default Battle;
