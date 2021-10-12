import { createContext, useState, useCallback } from "react";

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState("");

  const join = (code) => {
    localStorage.setItem("code", code);
    setRoom(code);
  };

  const leave = () => {
    localStorage.removeItem("code");
    setRoom("");
  };

  const verifyRoom = useCallback(() => {
    const code = localStorage.getItem("code");
    if (!code) {
      setRoom("");
      return false;
    }
    setRoom(code);
    return true;
  }, []);

  return (
    <RoomContext.Provider value={{ room, join, leave, verifyRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
