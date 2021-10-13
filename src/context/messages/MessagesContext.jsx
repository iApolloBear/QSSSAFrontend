import { createContext, useReducer } from "react";
import { messagesReducer } from "./messagesReducer";

export const MessagesContext = createContext();

const initialState = {
  messages: [],
};

export const MessagesProvider = ({ children }) => {
  const [messagesState, dispatch] = useReducer(messagesReducer, initialState);
  return (
    <MessagesContext.Provider value={{ messagesState, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
