// /* eslint-disable react/prop-types */
import { Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useInterval } from "react-use";
import {
  selectSelectedCategory,
  setSelectedCategory,
} from "../../redux/marketSlice";
import {
  loadCommonStats,
  loadMetamonStats,
  selectCommonStats,
  selectMetamonStats,
} from "../../redux/statsSlice";
import formatNumber from "../../utils/formatNumber";

const NonPropsItem = ({ cate, selectedCategory }) => {
  const dispatch = useDispatch();
  const handleSelectCategory = () => {
    dispatch(setSelectedCategory(cate.slug));
  };

  return (
    <Flex
      justify="space-between"
      w="100%"
      cursor="pointer"
      key={cate.slug}
      mb="1"
      color={selectedCategory === cate.slug ? "orange.500" : ""}
      onClick={handleSelectCategory}
    >
      <Flex
        justify="space-between"
        minW="15rem"
        // cursor="pointer"
        // key={cate.slug}
        // mb="1"
        // color={selectedCategory === cate.slug ? "orange.500" : ""}
        // onClick={handleSelectCategory}
      >
        <Flex fontSize="xs">{cate.name}</Flex>
        <Flex fontSize="xs">{formatNumber(cate.price)}</Flex>
      </Flex>
      <Flex fontSize="xs">{cate.count}</Flex>
    </Flex>
  );
};

const Sidebar = () => {
  const dispatch = useDispatch();
  const commonStats = useSelector(selectCommonStats);
  const metamonStats = useSelector(selectMetamonStats);
  const selectedCategory = useSelector(selectSelectedCategory);

  const handleSelectMetamon = () => {
    dispatch(setSelectedCategory("metamon"));
  };

  useEffect(() => {
    dispatch(loadMetamonStats());
    dispatch(loadCommonStats());
  }, [dispatch]);

  useInterval(() => {
    dispatch(loadMetamonStats());
    dispatch(loadCommonStats());
  }, 60 * 1000);

  return (
    <Flex
      bg="blackAlpha.700"
      color="whiteAlpha.900"
      w="20rem"
      flexDir="column"
      p="10"
      justify="center"
      align="center"
      pos="relative"
    >
      <Flex
        flexDir="column"
        align="center"
        cursor="pointer"
        color={selectedCategory === "metamon" ? "orange.500" : ""}
        onClick={handleSelectMetamon}
      >
        <Flex>Metamon</Flex>
        {metamonStats &&
          metamonStats.map((cate) => (
            <Flex justify="space-between" w="18rem" key={cate.slug}>
              <Flex justify="space-between" minW="15rem">
                <Flex fontSize="xs">{cate.name}</Flex>
                <Flex fontSize="xs">{formatNumber(cate.price)}</Flex>
              </Flex>
              <Flex fontSize="xs">{cate.count}</Flex>
            </Flex>
          ))}
      </Flex>
      <Flex flexDir="column" align="center" w="18rem">
        <Flex>Non-property Items</Flex>
        {commonStats &&
          commonStats.map((cate) => (
            <NonPropsItem
              cate={cate}
              key={cate.slug}
              selectedCategory={selectedCategory}
            />
          ))}
      </Flex>
      <Flex
        flexDir="column"
        fontSize="xs"
        fontStyle="italic"
        pos="absolute"
        bottom={1}
        right={1}
      >
        <Text>Cập nhật thống kê mỗi 60s</Text>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
