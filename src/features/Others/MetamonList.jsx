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
import { useSelector } from "react-redux";
import { selectSelectedCategory } from "../../redux/navSlice";

import MetamonItem from "./MetamonItem";

const MetamonListAttr = ({ selectedCategory }) => {
  return (
    <Tr>
      <Th>Avatar</Th>
      <Th>#ID</Th>
      <Th isNumeric>Đơn giá</Th>

      {selectedCategory === "metamon" ? (
        <>
          <Th isNumeric>Rarity</Th>
          <Th isNumeric>Level</Th>
          <Th isNumeric>Score</Th>
          <Th>Đăng lúc</Th>
        </>
      ) : (
        <>
          <Th isNumeric>Số lượng</Th>
          <Th isNumeric>Tổng giá</Th>
        </>
      )}
      <Th>Link Market</Th>
    </Tr>
  );
};

const MetamonList = ({ metamons }) => {
  const selectedCategory = useSelector(selectSelectedCategory);
  return (
    <Flex flexDir="column" w="100%" overflowY="scroll">
      <Table variant="simple" size="sm">
        <TableCaption>Metamon</TableCaption>
        <Thead>
          <MetamonListAttr selectedCategory={selectedCategory} />
        </Thead>
        <Tbody>
          {metamons.map((metamon) => (
            <MetamonItem
              metamon={metamon}
              key={metamon.marketId}
              selectedCategory={selectedCategory}
            />
          ))}
        </Tbody>
        <Tfoot>
          <MetamonListAttr selectedCategory={selectedCategory} />
        </Tfoot>
      </Table>
    </Flex>
  );
};

export default MetamonList;
