/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import {
  getPosts as getPostsAPI,
  getLimitPosts as getLimitPostsAPI,
} from "../../WebAPI";

export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    totoalPostCount: null,
    currentPage: 1,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setTotalPostCount: (state, action) => {
      state.totoalPostCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setPosts,
  setIsLoading,
  setTotalPostCount,
  setCurrentPage,
} = postsReducer.actions;

export const getPostsCount = () => (dispatch) => {
  getPostsAPI().then((data) => {
    dispatch(setTotalPostCount(data.length));
    return data;
  });
};

export const pagingPosts = (page, limit) => (dispatch) => {
  getLimitPostsAPI(page, limit)
    .then((res) => {
      dispatch(setPosts(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

export default postsReducer.reducer;
