import { createContext, useReducer } from "react";
import { groupsReducer } from "./groupsReducer";

export const GroupsContext = createContext();

const initialState = {
  groups: [],
};

export const GroupsProvider = ({ children }) => {
  const [groupsState, dispatch] = useReducer(groupsReducer, initialState);
  return (
    <GroupsContext.Provider value={{ groupsState, dispatch }}>
      {children}
    </GroupsContext.Provider>
  );
};
