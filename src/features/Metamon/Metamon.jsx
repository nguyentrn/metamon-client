/* eslint-disable react/prop-types */
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";
import {
  loadMetamonMarket,
  selectMetamons,
  selectSettings,
  selectUpdatedAt,
} from "../../redux/metamonSlice";
import Settings from "../Settings";
import MetamonList from "./MetamonList";

const Metamon = () => {
  const dispatch = useDispatch();
  const metamons = useSelector(selectMetamons);
  const settings = useSelector(selectSettings);
  const updatedAt = useSelector(selectUpdatedAt);

  useInterval(() => {
    dispatch(loadMetamonMarket());
    return () => null;
  }, 60 * 1000);

  useEffect(() => {
    dispatch(loadMetamonMarket());
  }, [dispatch, settings]);

  return (
    <Flex
      flexDir="column"
      bg="whiteAlpha.800"
      h="95vh"
      w="64rem"
      mt="2"
      overflowY="hidden"
      borderRadius="lg"
      align="center"
      pos="relative"
      boxShadow="md"
    >
      <Text fontSize="3xl" p="2">
        SkyEye
      </Text>
      <Settings />
      <MetamonList metamons={metamons} />
      <Flex
        flexDir="column"
        fontSize="xs"
        fontStyle="italic"
        pos="absolute"
        top={1}
        right={1}
      >
        <Text>Đang hiển thị {metamons.length} Metamon</Text>
        <Text>Cập nhật lúc {updatedAt}</Text>
      </Flex>
    </Flex>
  );
};

export default Metamon;
