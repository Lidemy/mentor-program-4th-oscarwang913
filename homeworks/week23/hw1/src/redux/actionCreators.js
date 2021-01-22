/* eslint-disable quotes */
/* eslint-disable arrow-body-style */
import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  FILTER_TODO,
  CLEAR_TODO,
} from "./actionTypes";

// action creator returns an action (object)
export const addTodo = (content) => {
  return {
    type: ADD_TODO,
    payload: {
      content,
    },
  };
};

export const toggleTodo = (id) => {
  return {
    type: TOGGLE_TODO,
    payload: { id },
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
};

export const filterTodo = (filter) => {
  return {
    type: FILTER_TODO,
    payload: { filter },
  };
};

export const clearTodo = () => {
  return {
    type: CLEAR_TODO,
  };
};
