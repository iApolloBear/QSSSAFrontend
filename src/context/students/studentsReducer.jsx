import { types } from "../../types/types";

export const studentsReducer = (state, action) => {
  switch (action.type) {
    case types.studentsLoaded:
      return { ...state, students: action.payload };
    default:
      return state;
  }
};
