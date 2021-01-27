/* eslint-disable import/no-unresolved */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable react/react-in-jsx-scope */
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAccount } from "../../redux/reducers/usersReducer";

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
  &:hover {
    text-decoration: none;
  }
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
  const history = useHistory();
  const users = useSelector((store) => store.users.users);
  const dispatch = useDispatch();

  // 登出的時候把token清掉,也要把user變成null，header上的登出就會變登入
  const handleLogOut = () => {
    dispatch(logoutAccount());
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
        {users && <Nav to="/createPost">Write</Nav>}
        {users ? (
          <Nav to="/" onClick={handleLogOut}>
            Sign Out
          </Nav>
        ) : (
          <Nav to="/login">Sign In</Nav>
        )}
        {users ? null : <Nav to="/register">Register</Nav>}
      </NavList>
    </HeaderContainer>
  );
}
