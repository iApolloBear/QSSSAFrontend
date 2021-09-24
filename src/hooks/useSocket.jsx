import { useEffect, useState, useCallback, useContext } from "react";
import io from "socket.io-client";
import { StudentsContext } from "../context/students/StudentsContext";
import { types } from "../types/types";

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);
  const { dispatch } = useContext(StudentsContext);

  const connectSocket = useCallback(
    (path = "") => {
      const token = localStorage.getItem("token");

      const socketTemp = io.connect(serverPath, {
        transports: ["websocket"],
        autoConnect: true,
        forceNew: true,
        query: {
          "x-token": token,
          path,
        },
      });
      setSocket(socketTemp);
    },
    [serverPath]
  );

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
    socket?.on("list-users", (users) => {
      dispatch({ type: types.studentsLoaded, payload: users });
    });
  }, [socket, dispatch]);

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
  };
};
