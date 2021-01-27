/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable quotes */
/* eslint-disable arrow-parens */
import React, { useEffect } from "react";
import styled from "styled-components";
import { ResetStyle, GlobalStyle } from "../../globalStyle";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { getUsers } from "../../redux/reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header";
import HomePage from "../../pages/HomePage";
import SinglePostPage from "../../pages/SinglePostPage";
import LoginPage from "../../pages/LoginPage";
import CreatePost from "../../pages/CreatePost";
import RegisterPage from "../../pages/RegisterPage";
import EditPostPage from "../../pages/EditPage";
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

const App = () => {
  const user = useSelector((store) => store.users.users);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Root>
      <ResetStyle />
      <GlobalStyle />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/posts/:id">
            <SinglePostPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          {user && (
            <Route path="/createPost">
              <CreatePost />
            </Route>
          )}
          <Route path="/editPost/:id">
            <EditPostPage />
          </Route>
          <Route>
            <AboutPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
};

export default App;
