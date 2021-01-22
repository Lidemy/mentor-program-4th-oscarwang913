/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-useless-return */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";

import { useHistory } from "react-router-dom";
import { validation } from "../../components/dataValidation";
import { getMe, registerAccount } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";

const RegisterPageContainer = styled.div`
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

const RegisterForm = styled.form`
  width: 100%;
  text-align: center;
`;

const RegisterPageTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
`;
const UserNameInput = styled.input`
  padding: 12px 10px;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  margin-top: 16px;
  border-width: 0px 0px 2px;
`;

const InputWrapper = styled.div`
  width: 100%;
`;
const NickNameInput = styled(UserNameInput)``;
const PasswordInput = styled(UserNameInput)``;
const SubmitBtn = styled.button`
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

export default function RegisterPage() {
  const [values, setValues] = useState({
    userName: "",
    nickName: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [apiResError, setApiResError] = useState();
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  // For checking first render. If yes, then do not run the validation
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender) {
      firstRender.current = false;
      return;
    }
  }, [values.nickName, values.userName, values.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.userName || !values.nickName || !values.password) {
      setErrors(validation(values));
      return;
    }
    registerAccount(values.userName, values.nickName, values.password).then(
      // eslint-disable-next-line consistent-return
      (res) => {
        if (res.ok !== 1) {
          return setApiResError(res.message);
        }
        setApiResError(res.message);
        setAuthToken(res.token);

        getMe().then((res) => {
          if (res.ok !== 1) {
            // 有拿到token，但還是沒有登入成功
            setAuthToken(null);
            return setApiResError(res.toString());
          }
          setUser(res.data);
          history.push("/");
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <RegisterPageContainer>
      <RegisterPageTitle>Register</RegisterPageTitle>
      {apiResError && <div>{apiResError}</div>}
      <RegisterForm onSubmit={handleSubmit}>
        <InputWrapper>
          <UserNameInput
            name="userName"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={values.userName}
            onFocus={handleFocus}
          />
        </InputWrapper>
        {errors.userName && <div>{errors.userName}</div>}
        <InputWrapper>
          <NickNameInput
            name="nickName"
            type="text"
            placeholder="Nickname"
            onChange={handleChange}
            value={values.nickName}
            onFocus={handleFocus}
          />
        </InputWrapper>
        {errors.nickName && <div>{errors.nickName}</div>}
        <InputWrapper>
          <PasswordInput
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={values.password}
            onFocus={handleFocus}
          />
        </InputWrapper>
        {errors.password && <div>{errors.password}</div>}
        <SubmitBtn>Create An Account</SubmitBtn>
      </RegisterForm>
    </RegisterPageContainer>
  );
}
