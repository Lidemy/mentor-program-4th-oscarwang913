/* eslint-disable arrow-parens */
/* eslint-disable no-plusplus */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, CLEAR_TODO } from "../actionTypes";

let todoId;

if (!window.localStorage.getItem("todos")) {
  todoId = 0;
} else {
  const dataLength = JSON.parse(window.localStorage.getItem("todos")).length;
  todoId = dataLength;
}

function initState() {
  if (!window.localStorage.getItem("todos")) return { todos: [] };
  return { todos: JSON.parse(window.localStorage.getItem("todos")) };
}

export default function todoReducer(state = initState(), action) {
  switch (action.type) {
    case ADD_TODO: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: todoId++,
            content: action.payload.content,
            isCompleted: false,
          },
        ],
      };
    }
    case TOGGLE_TODO: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload.id) return todo;
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }),
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }
    case CLEAR_TODO: {
      return {
        todos: [],
      };
    }
    default:
      return state;
  }
}
