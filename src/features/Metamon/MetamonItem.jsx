/* eslint-disable react/prop-types */
import { Tr, Td, Text, Image, Badge } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
dayjs.extend(relativeTime);
dayjs.locale("vi");

const MetamonItem = ({ metamon }) => {
  const handleMarket = () => {
    window.open(
      `https://market.radiocaca.com/#/market-place/${metamon.marketId}`
    );
  };

  return (
    <Tr key={metamon.id}>
      <Td py="1">
        <Image boxSize="4rem" src={metamon.img} />
      </Td>
      <Td fontSize="xs">Metamon#{metamon.id}</Td>
      <Td isNumeric color="green.500">
        {numberWithCommas(metamon.price)}
      </Td>
      <Td
        fontWeight="bold"
        color={metamon.rarity === "N" ? "blackAlpha.900" : "yellow.500"}
      >
        <Badge
          fontSize="2xl"
          p="3"
          borderRadius="lg"
          colorScheme={metamon.rarity === "N" ? "gray" : "yellow"}
        >
          {metamon.rarity}
        </Badge>
      </Td>
      <Td
        isNumeric
        fontSize="xl"
        fontWeight="bold"
        color="red.500"
        margin="center"
      >
        {metamon.level}
      </Td>
      <Td
        isNumeric
        fontSize="lg"
        fontWeight="bold"
        color="red.500"
        margin="center"
      >
        {metamon.score}
      </Td>
      <Td>
        {dayjs(metamon.createdAt).format("HH:mm")}{" "}
        <Text as="span" fontSize="xs">
          ({dayjs(metamon.createdAt).fromNow()})
        </Text>
      </Td>
      <Td cursor="pointer" color="blue.500" onClick={handleMarket}>
        /{metamon.marketId}
      </Td>
    </Tr>
  );
};

export default MetamonItem;
