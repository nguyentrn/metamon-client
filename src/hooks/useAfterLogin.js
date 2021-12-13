import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initUser } from "../redux/authSlice";

const useAfterLogin = () => {
  const { data } = useSession();

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(initUser(data.token));
    }
  }, [data]);
};

export default useAfterLogin;
