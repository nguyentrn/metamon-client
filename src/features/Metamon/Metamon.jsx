/* eslint-disable react/prop-types */
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";
import { loadMetamonMarket, selectMetamons } from "../../redux/metamonSlice";
import MetamonList from "./MetamonList";

const Metamon = () => {
  const dispatch = useDispatch();
  const metamons = useSelector(selectMetamons);

  // useInterval(() => {
  //   dispatch(loadMetamonMarket());
  //   return () => null;
  // }, 8000);

  useEffect(() => {
    dispatch(loadMetamonMarket());
  }, []);

  return (
    <Flex
      flexDir="column"
      bg="whiteAlpha.900"
      h="90vh"
      w="64rem"
      mt="2"
      overflowY="hidden"
      borderRadius="lg"
      align="center"
    >
      <Text>Đang hiển thị {metamons.length} Metamon</Text>
      <MetamonList metamons={metamons} />
    </Flex>
  );
};

export default Metamon;
