import { combineReducers } from "redux";

const posts = (state = [], action) => {
  switch (action.type) {
    case "ADD_PHOTO":
      return [...state, action.post];
    case "REMOVE_PHOTO":
      return state.filter((post) => post.id !== action.index);
    case "GET_POSTS":
      return action.posts;
    default:
      return state;
  }
};

const comments = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      if (!state[action.id]) {
        return { ...state, [action.id]: [action.comment] };
      } else {
        return { ...state, [action.id]: [...state[action.id], action.comment] };
      }
    case "GET_COMMENTS":
      return action.comments;
    default:
      return state;
  }
};

const rootReducer = combineReducers({ posts, comments });
export default rootReducer;
