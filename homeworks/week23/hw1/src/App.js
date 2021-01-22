/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from "react";
import "./App.css";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./components/Todo";
import TodoForm from "./components/TodoForm";

import { filterTodo, clearTodo } from "./redux/actionCreators";

const TodoWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
`;

const TodoList = styled.div``;

const StatusWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const AllTodo = styled.div`
  cursor: pointer;
`;
const CompletedTodo = styled.div`
  cursor: pointer;
`;
const IncompletedTodo = styled.div`
  cursor: pointer;
`;
const BtnClean = styled.div`
  cursor: pointer;
`;

// Store in localStorage
function StoreToLocalstorage(todos) {
  window.localStorage.setItem("todos", JSON.stringify(todos));
}

function App() {
  const todos = useSelector((state) => state.todoState.todos);
  console.log(todos);
  const selectorFilters = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  // if todos is changed, the localstorage will be triggered
  useEffect(() => {
    StoreToLocalstorage(todos);
  }, [todos]);

  const handleFilter = (filter) => () => {
    dispatch(filterTodo(filter));
  };

  const handleClearTodo = () => {
    dispatch(clearTodo());
  };

  return (
    <TodoWrapper>
      <TodoForm />
      <StatusWrapper>
        <AllTodo onClick={handleFilter("all")}>全部</AllTodo>
        <CompletedTodo onClick={handleFilter("complete")}>已完成</CompletedTodo>
        <IncompletedTodo onClick={handleFilter("incomplete")}>
          未完成
        </IncompletedTodo>
        <BtnClean onClick={handleClearTodo}>清空所有項目</BtnClean>
      </StatusWrapper>
      <TodoList>
        {todos &&
          todos
            .filter((todo) => {
              switch (selectorFilters) {
                case "all":
                  return true;
                case "complete":
                  return todo.isCompleted;
                case "incomplete":
                  return !todo.isCompleted;
                default:
                  return true;
              }
            })
            .map((todo) => <Todo todo={todo} key={todo.id} />)}
      </TodoList>
    </TodoWrapper>
  );
}

export default App;
