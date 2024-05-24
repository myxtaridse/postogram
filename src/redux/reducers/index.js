import { combineReducers } from "redux";
import { photosReducer } from "./photos";
import { usersReducer } from "./user";
import { postsByUserReducer } from "./photosByUser";
import { postsReducer } from "./posts";

export const rootReducer = combineReducers({
  photos: photosReducer,
  users: usersReducer,
  postsByUser: postsByUserReducer,
  posts: postsReducer,
});
