import { createContext, useReducer } from "react";
import { qsssaReducer } from "./qsssaReducer";

export const QSSSAContext = createContext();

const initialState = {
  qsssa: {}
};

export const QSSSAProvider = ({ children }) => {
  const [qsssaState, dispatch] = useReducer(qsssaReducer, initialState);
  return (
    <QSSSAContext.Provider value={{ qsssaState, dispatch }}>
      {children}
    </QSSSAContext.Provider>
  );
};
