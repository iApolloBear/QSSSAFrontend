import { createContext, useReducer } from "react";
import { studentsReducer } from "./studentsReducer";

export const StudentsContext = createContext();

const initialState = {
  students: [],
};

export const StudentsProvider = ({ children }) => {
  const [studentsState, dispatch] = useReducer(studentsReducer, initialState);
  return (
    <StudentsContext.Provider value={{ studentsState, dispatch }}>
      {children}
    </StudentsContext.Provider>
  );
};
