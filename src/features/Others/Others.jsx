/* eslint-disable react/prop-types */
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";

import { selectSelectedCategory } from "../../redux/navSlice";
import {
  loadMetamonMarket,
  selectMetamons,
  selectSettings,
  loadOthersMarket,
  selectLastId,
  selectOthers,
  selectUpdatedAt,
} from "../../redux/othersSlice";
import Settings from "../Settings";
import MetamonList from "./MetamonList";

const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/noti.mp3`);

const Metamon = () => {
  const dispatch = useDispatch();
  const metamons = useSelector(selectMetamons);
  const others = useSelector(selectOthers);
  const settings = useSelector(selectSettings);
  const updatedAt = useSelector(selectUpdatedAt);
  const lastItemId = useSelector(selectLastId);
  const selectedCategory = useSelector(selectSelectedCategory);

  useInterval(() => {
    if (selectedCategory === "metamon") {
      dispatch(loadMetamonMarket());
    } else {
      dispatch(loadOthersMarket());
    }
    return () => null;
  }, (selectedCategory === "metamon" ? 30 : 10) * 1000);

  useEffect(() => {
    if (selectedCategory === "metamon") {
      dispatch(loadMetamonMarket());
    } else {
      dispatch(loadOthersMarket());
    }
    return () => null;
  }, [dispatch, settings, selectedCategory]);

  useEffect(() => {
    audio.play();
  }, [dispatch, lastItemId]);

  return (
    <Flex
      flexDir="column"
      bg="whiteAlpha.800"
      h="95vh"
      w="56rem"
      m="auto"
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
      <MetamonList
        metamons={selectedCategory === "metamon" ? metamons : others}
      />

      <Flex
        flexDir="column"
        fontSize="xs"
        fontStyle="italic"
        pos="absolute"
        top={1}
        right={1}
      >
        <Text>
          Đang hiển thị{" "}
          {selectedCategory === "metamon" ? metamons.length : others.length} NFT
        </Text>
        <Text>Cập nhật lúc {updatedAt}</Text>
        <Text>
          Cập nhật danh sách mỗi {selectedCategory === "metamon" ? 30 : 10}s
        </Text>
      </Flex>
    </Flex>
  );
};

export default Metamon;
