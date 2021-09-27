import { types } from "../../types/types";

export const groupsReducer = (state, action) => {
  switch (action.type) {
    case types.groupsLoaded:
      return { ...state, groups: action.payload };
    default:
      return state;
  }
};
