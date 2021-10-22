import { types } from "../../types/types";

export const qsssaReducer = (state, action) => {
  switch (action.type) {
    case types.qsssaLoaded:
      return { ...state, qsssa: action.payload };
    default:
      return state;
  }
};
