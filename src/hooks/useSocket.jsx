import { useEffect, useState, useCallback, useContext } from "react";
import io from "socket.io-client";
import { StudentsContext } from "../context/students/StudentsContext";
import { GroupsContext } from "../context/groups/GroupsContext";
import { MessagesContext } from "../context/messages/MessagesContext";
import { types } from "../types/types";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);
  const { dispatch } = useContext(StudentsContext);
  const { dispatch: groupsDispatch } = useContext(GroupsContext);
  const { dispatch: messagesDispatch } = useContext(MessagesContext);

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

  const joinRoom = useCallback(
    (room) => {
      socket?.emit("join", room);
    },
    [socket]
  );

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

  useEffect(() => {
    socket?.on("group-message", (messages) => {
      messagesDispatch({ type: types.messagesLoaded, payload: messages });
    });
  }, [socket, messagesDispatch]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
    joinRoom,
  };
};
