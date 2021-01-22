/* eslint-disable react/jsx-filename-extension */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import React, { useContext } from "react";
import styled from "styled-components";
// 用hash的話表示他是換頁後，他只是首頁下面的某個子部分，而不是新的一頁，所以還是載入首頁
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { setAuthToken } from "../../utils";

const HeaderContainer = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  padding: 0 20px;
`;

const Brand = styled.div`
  font-size: 40px;
  font-weight: 600;
`;
const NavList = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const Nav = styled(Link)`
  margin-left: 12px;
  border-radius: 5px;
  color: #000000;
  text-decoration: none;
  padding: 10px 15px;
  ${(props) =>
    props.$active &&
    `
    background: rgba(0, 0, 0, 0.2);
  `}
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  ${NavList} {
    margin-left: 12px;
  }
`;

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  // 登出的時候把token清掉,也要把user變成null，header上的登出就會變登入
  const handleLogOut = () => {
    setAuthToken("");
    setUser(null);
    history.push("/");
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Brand>Contenido</Brand>
        <NavList>
          {/* 用as可以將div變成Link */}
          <Nav $active to="/">
            HOME
          </Nav>
          <Nav to="/about">ABOUT</Nav>
        </NavList>
      </HeaderLeft>
      <NavList>
        {user && <Nav to="/createPost">Write</Nav>}
        {user ? (
          <Nav to="/" onClick={handleLogOut}>
            Sign Out
          </Nav>
        ) : (
          <Nav to="/login">Sign In</Nav>
        )}
        {user ? null : <Nav to="/register">Register</Nav>}
      </NavList>
    </HeaderContainer>
  );
}
