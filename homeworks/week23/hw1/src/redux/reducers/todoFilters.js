/* eslint-disable quotes */
import { FILTER_TODO } from "../actionTypes";

// set an initial value to filter
const initialState = {
  filter: "all",
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_TODO: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }
    default:
      return state;
  }
}
