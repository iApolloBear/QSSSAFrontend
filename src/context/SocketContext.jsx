import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { GroupsContext } from "./groups/GroupsContext";
import { types } from "../types/types";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, disconnectSocket } = useSocket(
    "http://localhost:4000"
  );
  const { auth } = useContext(AuthContext);
  const { dispatch: groupsDispatch } = useContext(GroupsContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket(auth.qsssa);
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    socket?.on("list-groups", (groups) => {
      groupsDispatch({ type: types.groupsLoaded, payload: groups });
    });
  }, [socket, groupsDispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
