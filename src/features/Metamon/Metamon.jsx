/* eslint-disable react/prop-types */
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";
import {
  loadMetamonMarket,
  selectLastId,
  selectMetamons,
  selectSettings,
  selectUpdatedAt,
} from "../../redux/metamonSlice";
import Settings from "../Settings";
import MetamonList from "./MetamonList";

const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/noti.mp3`);

const Metamon = () => {
  const dispatch = useDispatch();
  const metamons = useSelector(selectMetamons);
  const settings = useSelector(selectSettings);
  const updatedAt = useSelector(selectUpdatedAt);
  const lastId = useSelector(selectLastId);

  useInterval(() => {
    dispatch(loadMetamonMarket());
    return () => null;
  }, 30 * 1000);

  useEffect(() => {
    dispatch(loadMetamonMarket());
  }, [dispatch, settings]);

  useEffect(() => {
    audio.play();
  }, [dispatch, lastId]);

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
