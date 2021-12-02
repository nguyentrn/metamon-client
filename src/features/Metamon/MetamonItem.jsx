/* eslint-disable react/prop-types */
import { Tr, Td, Text, Image } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { useEffect } from "react";

const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/awaken.mp3`);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
dayjs.extend(relativeTime);
dayjs.locale("vi");

const MetamonItem = ({ metamon }) => {
  useEffect(() => {
    // if (metamon.props[2].value >= 10) {
    //   audio.play();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMarket = () => {
    window.open(
      `https://market.radiocaca.com/#/market-place/${metamon.marketId}`
    );
  };

  const handleArtwork = () => {
    window.open(`https://market.radiocaca.com/#/artwork/${metamon.artworkId}`);
  };

  return (
    <Tr key={metamon.id}>
      <Td py="1">
        <Image boxSize="4rem" src={metamon.img} />
      </Td>
      <Td fontSize="xs">Metamon#{metamon.id}</Td>å
      <Td isNumeric color="green.500">
        {numberWithCommas(metamon.price)}
      </Td>
      <Td fontSize="xl" fontWeight="bold">
        {metamon.rarity}
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
      <Td cursor="pointer" color="blue.500" onClick={handleArtwork}>
        /{metamon.artworkId}
      </Td>
    </Tr>
  );
};

export default MetamonItem;
