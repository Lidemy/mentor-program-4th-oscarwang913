/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
import { createSlice } from "@reduxjs/toolkit";
import {
  getSinglePost as getSinglePostAPI,
  postNewPost as postNewPostAPI,
  deletePost as deletePostAPI,
  updatePost as updatePostAPI,
} from "../../WebAPI";

export const singlePostReducer = createSlice({
  name: "singlePost",
  initialState: {
    isLoadingPost: false,
    singlePost: "",
    newPostResponse: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload.isLoading;
    },
    setSinglePost: (state, action) => {
      state.singlePost = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
    resetSinglePost: (state) => {
      state.singlePost = "";
    },
  },
});

export const {
  setSinglePost,
  setIsLoadingPost,
  setNewPostResponse,
  resetSinglePost,
} = singlePostReducer.actions;

export const getSinglePost = (id) => (dispatch) => {
  getSinglePostAPI(id).then((res) => {
    dispatch(setSinglePost(res[0]));
  });
};

export const postNewPost = (data) => (dispatch) => {
  return postNewPostAPI(data).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export const reset = () => (dispatch) => {
  dispatch(resetSinglePost());
};

export const deletePost = (id) => () => {
  return deletePostAPI(id).then((res) => res);
};

export const updatePost = (data) => (dispatch) => {
  return updatePostAPI(data).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};
export default singlePostReducer.reducer;
