import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { selectIsLoading, selectToken } from "../../redux/authSlice";
import Background from "../../components/Background";
import Login from "./layouts/Login";
import Dashboard from "./layouts/Dashboard";

const MetamonGame = () => {
  const isLoading = useSelector(selectIsLoading);
  const token = useSelector(selectToken);

  return (
    <Flex pos="relative" h="100vh" align="center" justify="center">
      <Background />
      {!isLoading && token ? <Dashboard /> : <Login />}
    </Flex>
  );
};

export default MetamonGame;
