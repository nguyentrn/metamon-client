import { useSelector } from "react-redux";

import { selectGameToken } from "../../redux/gameSlice";
import AddressSubmit from "./layouts/AddressSubmit";
import Dashboard from "./layouts/Dashboard";

const MetamonGame = () => {
  const gameToken = useSelector(selectGameToken);

  return gameToken ? <Dashboard /> : <AddressSubmit />;
};

export default MetamonGame;
