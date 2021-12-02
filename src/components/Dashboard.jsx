/* eslint-disable react/prop-types */
import { Flex, Button, Spinner, Text, Image } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBattleInfo,
  selectIsLoadingData,
  startManyBattle,
  startOneBattle,
} from "../redux/dataSlice";
import useInitData from "../hooks/useInitData";
import Container from "./Container";
import MetamonGame from "../features/MetamonGame";
import Market from "../features/Market/Market";
import { selectErr } from "../redux/authSlice";

const Dashboard = () => {
  useInitData();
  const { fightMonster, items, property } = useSelector((state) => state.data);
  const err = useSelector(selectErr);

  return (
    <Container align="center" justify="center" p="2">
      {fightMonster && items && property ? <MetamonGame /> : <Spinner />}
      <Market />
    </Container>
  );
};

export default Dashboard;
