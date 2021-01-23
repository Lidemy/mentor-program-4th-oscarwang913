/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
import React, { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/actionCreators";

const Form = styled.form`
  display: flex;
  align-items: center;
  background-color: #444444;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const AddButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

const TodoInputField = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  color: #ffffff;
  padding: 8px 12px;
`;

function TodoForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      dispatch(addTodo(value));
      setValue("");
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AddButton type="submit">
        <FaPlus />
      </AddButton>
      <TodoInputField
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="新增工作"
      />
    </Form>
  );
}

export default TodoForm;
