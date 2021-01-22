/* eslint-disable arrow-parens */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
import React from "react";
import styled from "styled-components";
import { FaRegTrashAlt, FaEdit, FaRegCircle, FaCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "../redux/actionCreators";

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  margin-bottom: 16px;
  border-radius: 5px;
  &:hover button {
    visibility: visible;
  }
  background-color: ${(props) => (props.isCompleted ? "#cccccc" : "#444444")};
`;

const Checkbutton = styled.div`
  margin-right: 12px;
  color: ${(props) => (props.isCompleted ? "green" : "#aaaaaa")};
`;

const TodoContent = styled.div`
  flex: 1;
  color: #ffffff;
`;

const TodoButtons = styled.div``;

const DeleteButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  visibility: hidden;
  & > * {
    color: #ffffff;
  }
`;

const EditButton = styled(DeleteButton)`
  margin-right: 12px;
`;

function Todo({ todo }) {
  const dispatch = useDispatch();
  return (
    <TodoItemWrapper data-id={todo.id} isCompleted={todo.isCompleted}>
      <Checkbutton
        isCompleted={todo.isCompleted}
        onClick={() => {
          dispatch(toggleTodo(todo.id));
        }}
      >
        {todo.isCompleted ? <FaCircle /> : <FaRegCircle />}
      </Checkbutton>
      <TodoContent>{todo.content}</TodoContent>
      <TodoButtons>
        <EditButton>
          <FaEdit />
        </EditButton>
        <DeleteButton
          onClick={() => {
            dispatch(deleteTodo(todo.id));
          }}
        >
          <FaRegTrashAlt />
        </DeleteButton>
      </TodoButtons>
    </TodoItemWrapper>
  );
}

export default Todo;
