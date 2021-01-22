/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import { createStore } from "redux";
import rootReducer from "./reducers/";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
