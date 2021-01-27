/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-named-as-default */
/* eslint-disable quotes */
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./reducers/postsReducer";
import singlePostReducer from "./reducers/singlePostReducer";
import usersReducer from "./reducers/usersReducer";

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    singlePost: singlePostReducer,
  },
});
