/* eslint-disable react/prop-types */
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react";

import MetamonItem from "./MetamonItem";

const MetamonListAttr = () => {
  return (
    <Tr>
      <Th>Avatar</Th>
      <Th>#ID</Th>
      <Th isNumeric>Giá</Th>
      <Th isNumeric>Rarity</Th>
      <Th isNumeric>Level</Th>
      <Th isNumeric>Score</Th>
      <Th>Đăng lúc</Th>
      <Th>Link Market</Th>
      <Th>Link Artwork</Th>
    </Tr>
  );
};

const MetamonList = ({ metamons }) => {
  return (
    <Flex flexDir="column" w="100%" overflowY="scroll">
      <Table variant="simple" size="sm">
        <TableCaption>Metamon</TableCaption>
        <Thead>
          <MetamonListAttr />
        </Thead>
        <Tbody>
          {metamons.map((metamon) => (
            <MetamonItem metamon={metamon} key={metamon.id} />
          ))}
        </Tbody>
        <Tfoot>
          <MetamonListAttr />
        </Tfoot>
      </Table>
    </Flex>
  );
};

export default MetamonList;
