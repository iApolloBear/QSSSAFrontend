import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { RoomContext } from "./RoomContext";
import { GroupsContext } from "./groups/GroupsContext";
import { types } from "../types/types";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, joinRoom } = useSocket(
    "https://qsssa-backend.herokuapp.com/"
  );
  const { auth } = useContext(AuthContext);
  const { room } = useContext(RoomContext);
  const { dispatch: groupsDispatch } = useContext(GroupsContext);

  useEffect(() => {
    if (auth.logged) {
      connectSocket();
    }
  }, [auth, connectSocket]);

  useEffect(() => {
    if (room) {
      joinRoom(room);
    }
  }, [room, joinRoom]);

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
