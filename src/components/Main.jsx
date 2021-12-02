// import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Metamon from "../features/Metamon";
// import { useDispatch, useSelector } from "react-redux";
// import { selectIsLoading, selectToken } from "../redux/authSlice";
// import Dashboard from "./Dashboard";
// import Login from "./Login";
// import { selectActivatedCategoryLabels } from "../redux/marketSlice";
// import Market from 'renderer/features/Market';
// import MetamonHunting from "../features/MetamonHunting";

const Background = () => {
  return (
    <Flex
      pos="fixed"
      zIndex="-1"
      background={`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('images/background.jpeg') center center/cover no-repeat`}
      w="100vw"
      h="100vh"
    />
  );
};

const Main = () => {
  // const isLoading = useSelector(selectIsLoading);
  // const token = useSelector(selectToken);
  // const dispatch = useDispatch();
  // const activatedCategories = useSelector(selectActivatedCategoryLabels);

  // useEffect(() => {
  //   dispatch(loadMarket());
  // }, [dispatch, activatedCategories.length]);

  return (
    <Flex
      pos="relative"
      flexDir="column"
      h="100vh"
      align="center"
      justify="center"
    >
      <Background />
      {/* {!isLoading && token ? <Dashboard /> : <Login />} */}
      {/* <Market />  */}
      {/* <MetamonHunting /> */}
      <Metamon />
    </Flex>
  );
};

export default Main;
