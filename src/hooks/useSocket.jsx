import { useEffect, useState, useCallback, useContext } from "react";
import io from "socket.io-client";
import { AppContext } from "../context/AppContext";
import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);
  const { dispatch } = useContext(AppContext);

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
    socket?.on("get-students", (users) => {
      dispatch({ type: types.studentsLoaded, payload: users });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("get-messages", ({ messages, group }) => {
      dispatch({ type: types.messagesLoaded, payload: messages });
      dispatch({ type: types.groupLoaded, payload: group });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("user-messages", (users) => {
      dispatch({ type: types.userMessagesLoaded, payload: users });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("get-my-group", async (id) => {
      const { group } = await fetchWithToken(`student/my-group/${id}`);
      socket?.emit("join-group", id);
      dispatch({ type: types.groupLoaded, payload: group });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("my-group", (group) => {
      dispatch({ type: types.groupLoaded, payload: group });
      dispatch({ type: types.membersLoaded, payload: group.UsersOnGroups });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("teacher-groups", (groups) => {
      dispatch({ type: types.groupsLoaded, payload: groups });
    });
  }, [socket, dispatch]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
