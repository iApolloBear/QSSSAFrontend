import { useEffect, useState, useCallback, useContext } from "react";
import io from "socket.io-client";
import { StudentsContext } from "../context/students/StudentsContext";
import { MessagesContext } from "../context/messages/MessagesContext";
import { GroupsContext } from "../context/groups/GroupsContext";
import { QSSSAContext } from "../context/qsssa/QSSSAContext";
import { types } from "../types/types";
import { fetchWithToken } from "../helpers/fetch";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);
  const { dispatch } = useContext(StudentsContext);
  const { dispatch: messagesDispatch } = useContext(MessagesContext);
  const { dispatch: groupDispatch } = useContext(GroupsContext);
  const { dispatch: qsssaDispatch } = useContext(QSSSAContext);

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

  const getMyGroup = useCallback(
    async (room) => {
      socket?.on("get-my-group", async () => {
        const resp = await fetchWithToken(`groups/${room}/my-group`);
        if (resp.ok) {
          groupDispatch({ type: types.groupsLoaded, payload: resp.group });
        }
      });
    },
    [socket, groupDispatch]
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
    socket?.on("get-students", (users) => {
      dispatch({ type: types.studentsLoaded, payload: users });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("group-message", (messages) => {
      messagesDispatch({ type: types.messagesLoaded, payload: messages });
    });
  }, [socket, messagesDispatch]);

  useEffect(() => {
    socket?.on("get-qsssa", (qsssa) => {
      qsssaDispatch({ type: types.qsssaLoaded, payload: qsssa });
    });
  }, [socket, qsssaDispatch]);

  useEffect(() => {
    socket?.on("get-my-group", async (id) => {
      const { group } = await fetchWithToken(`student/my-group/${id}`);
      groupDispatch({ type: types.groupsLoaded, payload: group });
    });
  }, [socket, groupDispatch]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
    joinRoom,
    getMyGroup,
  };
};
