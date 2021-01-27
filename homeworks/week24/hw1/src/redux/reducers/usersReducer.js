/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
import { createSlice } from "@reduxjs/toolkit";
import { getAuthToken, setAuthToken } from "../../utils";
import {
  getMe,
  login as loginAPI,
  registerAccount as registerAccountAPI,
} from "../../WebAPI";

export const usersReducer = createSlice({
  name: "users",
  initialState: {
    users: null,
    errorMessage: null,
    isLoadingUser: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    logout: (state) => {
      state.users = null;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setIsLoadingUser: (state, action) => {
      state.isLoadingUser = action.payload;
    },
  },
});

export const {
  setUsers,
  logout,
  setErrorMessage,
  setIsLoadingUser,
} = usersReducer.actions;

export const getUsers = () => (dispatch) => {
  dispatch(setIsLoadingUser(true));
  if (getAuthToken()) {
    return getMe().then((res) => {
      dispatch(setIsLoadingUser(false));
      if (res.ok !== 1) {
        setAuthToken(null);
        return;
      }
      dispatch(setUsers(res.data));
      return res.data;
    });
  }
};

export const login = (username, password) => (dispatch) => {
  return loginAPI(username, password).then((data) => {
    if (data.ok === 0) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    return dispatch(getUsers());
  });
};

export const registerAccount = (username, nickname, password) => (dispatch) => {
  return registerAccountAPI(username, nickname, password).then((data) => {
    if (data.ok !== 1) {
      dispatch(setErrorMessage(data.message));
      return;
    }
    setAuthToken(data.token);
    return dispatch(getUsers());
  });
};

export const logoutAccount = () => (dispatch) => {
  setAuthToken("");
  dispatch(logout());
};

export default usersReducer.reducer;
