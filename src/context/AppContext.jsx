import { createContext, useReducer } from "react";
import { appReducer } from "./appReducer";

export const AppContext = createContext();

const initialState = {
  students: [],
  messages: [],
  userMessages: [],
  groups: [],
  group: {},
  qsssa: {},
};

export const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
