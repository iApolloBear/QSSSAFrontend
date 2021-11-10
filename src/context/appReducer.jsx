import { types } from "../types/types";

export const appReducer = (state, action) => {
  switch (action.type) {
    case types.studentsLoaded:
      return { ...state, students: action.payload };
    case types.groupLoaded: {
      return { ...state, group: action.payload };
    }
    case types.messagesLoaded: {
      return { ...state, messages: action.payload };
    }
    case types.userMessagesLoaded: {
      return { ...state, userMessages: action.payload };
    }
    case types.groupsLoaded: {
      return { ...state, groups: action.payload };
    }
    case types.qsssaLoaded: {
      return { ...state, qsssa: action.payload };
    }
    default:
      return state;
  }
};
