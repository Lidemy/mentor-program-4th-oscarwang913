/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";
// 用hash的話表示他是換頁後，他只是首頁下面的某個子部分，而不是新的一頁，所以還是載入首頁

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
  const [errorMessage, setErrorMessage] = useState();
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleFormSubmit = () => {
    setErrorMessage(null);
    login(userName, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      // 當登入完後，要確認使用者身分
      getMe().then((res) => {
        if (res.ok !== 1) {
          // 有拿到token，但還是沒有登入成功
          setAuthToken(null);
          return setErrorMessage(res.toString());
        }
        setUser(res.data);
        history.push("/");
      });
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
