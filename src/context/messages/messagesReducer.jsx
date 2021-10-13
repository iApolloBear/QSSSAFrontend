import { types } from "../../types/types";

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case types.messagesLoaded:
      return { ...state, messages: action.payload };
    default:
      return state;
  }
};
