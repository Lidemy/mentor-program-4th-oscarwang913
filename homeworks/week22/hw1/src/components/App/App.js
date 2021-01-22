/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ResetStyle, GlobalStyle } from "../../globalStyle";
// 用hash的話表示他是換頁後，他只是首頁下面的某個子部分，而不是新的一頁，所以還是載入首頁
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken } from "../../utils";

import Header from "../Header";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import PostPage from "../../pages/PostPage";
import CreatePost from "../../pages/CreatePost";
import RegisterPage from "../../pages/RegisterPage";
import AboutPage from "../../pages/AboutPage";

const Root = styled.div`
  font-size: 16px;
  padding-top: 64px;
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: #f3f7f7;
  box-sizing: border-box;
`;

export default function App() {
  // Check user 是否有人，有人代表有登入
  const [user, setUser] = useState(null);

  // 如果有登入，應該在重整之後還是維持燈狀態。剛載入的時候會去打getMe，並檢查token。如果有token，表示可以登入
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getMe().then((res) => {
        if (res.ok === 1) {
          setUser(res.data);
        }
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <ResetStyle />
        <GlobalStyle />
        <Router>
          <Header />
          <Switch>
            {/* 加入 exact 表示URL一定要全部符合才會導過去 */}
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/createPost">
              <CreatePost />
            </Route>
            <Route path="/posts/:id">
              <PostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}
