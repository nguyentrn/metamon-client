/* eslint-disable react/prop-types */
import { Table, Thead, Tbody, Tr, Th, TableCaption } from "@chakra-ui/react";
import MonsterItem from "../components/MonsterItem";

const MonsterList = ({ monsters }) => {
  return (
    <Table variant="simple" size="sm">
      <TableCaption>Bạn đang có {monsters.length} Metamon</TableCaption>
      <Thead>
        <Tr>
          <Th>Avatar</Th>
          <Th isNumeric>#ID</Th>
          <Th isNumeric>Level</Th>
          <Th isNumeric>Score</Th>
          <Th isNumeric>EXP</Th>
          <Th isNumeric>Energy</Th>
          <Th isNumeric>Fight One</Th>
        </Tr>
      </Thead>
      <Tbody overflowY="scroll">
        {monsters.map((monster) => (
          <MonsterItem monster={monster} key={monster.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default MonsterList;
