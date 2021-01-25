/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, setErrorMessage } from "../../redux/reducers/usersReducer";

const LoginPageContainer = styled.div`
  width: 100%;
  max-width: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 25px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginForm = styled.form`
  width: 100%;
  text-align: center;
`;
const UserInput = styled.input`
  padding: 12px 10px;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  margin-top: 16px;
  border-width: 0px 0px 2px;
`;
const PasswordInput = styled(UserInput)``;

const SignInBtn = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  margin-top: 20px;
  font-weight: 600;
  font-size: 16px;
  width: 50%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = useSelector((store) => store.users.errorMessage);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    console.log(dispatch(login(userName, password)));
    dispatch(login(userName, password)).then((res) => {
      if (res) {
        history.push("/");
      }
    });
  };

  const handleUsernameInput = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  return (
    <LoginPageContainer>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <LoginForm onSubmit={handleFormSubmit}>
        <UserInput
          type="text"
          placeholder="Enter your username"
          value={userName}
          onChange={handleUsernameInput}
        />
        <PasswordInput
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordInput}
        />
        <SignInBtn>Sign In</SignInBtn>
      </LoginForm>
    </LoginPageContainer>
  );
}
