import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket } = useSocket(
    "https://neo-qsssa.herokuapp.com/"
    //"https://localhost:4000"
  );
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
