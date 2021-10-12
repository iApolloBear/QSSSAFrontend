import { useEffect, useState, useCallback, useContext } from "react";
import io from "socket.io-client";
import { StudentsContext } from "../context/students/StudentsContext";
import { GroupsContext } from "../context/groups/GroupsContext";
import { types } from "../types/types";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);
  const { dispatch } = useContext(StudentsContext);
  const { dispatch: groupsDispatch } = useContext(GroupsContext);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token,
      },
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  const joinRoom = (room) => {
    socket?.emit("join", room);
  };

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  useEffect(() => {
    socket?.on("list-users", (users) => {
      dispatch({ type: types.studentsLoaded, payload: users });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("list-groups", (groups) => {
      groupsDispatch({ type: types.groupsLoaded, payload: groups });
    });
  }, [socket, groupsDispatch]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
    joinRoom,
  };
};
