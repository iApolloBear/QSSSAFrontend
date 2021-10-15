import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { RoomContext } from "./RoomContext";
import { GroupsContext } from "./groups/GroupsContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, joinRoom, getMyGroup } = useSocket(
    "http://localhost:4000"
  );
  const { auth } = useContext(AuthContext);
  const { room } = useContext(RoomContext);
  const { groupsState } = useContext(GroupsContext);

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
    if (auth.role === "STUDENT_ROLE") {
      getMyGroup(room);
    }
  }, [auth, room, groupsState, getMyGroup]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
