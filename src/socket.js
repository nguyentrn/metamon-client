import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => {
  const [socket, setSocket] = useState();
  const { accessToken: token } = useSelector((store) => store.auth);

  // init
  useEffect(() => {
    const newSocket = io(global.config.SOCKET_URL, {
      reconnectionDelayMax: 1e4,
      query: {
        token,
      },
    });
    setSocket(newSocket);
    return () => newSocket.close();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socket;
};

export default useSocket;
