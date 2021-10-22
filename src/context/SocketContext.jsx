import { createContext, useContext, useEffect } from "react";
import { useSocket } from "../hooks/useSocket";
import { AuthContext } from "./AuthContext";
import { GroupsContext } from "./groups/GroupsContext";
import { RoomContext } from "./RoomContext";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { socket, online, connectSocket, joinRoom, getMyGroup } = useSocket(
    //"https://qsssa-backend.herokuapp.com"
    "http://localhost:4000"
  );
  const { auth } = useContext(AuthContext);
  const { room } = useContext(RoomContext);
  const {
    groupsState: { group },
  } = useContext(GroupsContext);

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
      if (group?._id) {
        socket?.emit("join-group", group._id);
      }
    }
  }, [auth, room, getMyGroup, socket, group]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
