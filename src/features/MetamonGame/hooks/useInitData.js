import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getData } from "../../../redux/gameSlice";

const useInitData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
};

export default useInitData;
