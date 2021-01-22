/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import { combineReducers } from "redux";
import todoReducer from "./todos";
import filtersReducer from "./todoFilters";

export default combineReducers({
  todoState: todoReducer,
  filter: filtersReducer,
});
