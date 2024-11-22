import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/memberSlice';
import store from '../store/store';

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  display: flex; /* flex 컨테이너 */
  align-items: center;
  
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
`;

// 1rem = 16px

export const Header = () => {

  // 페이지를 이동하는 함수
  const navigate = useNavigate();

  // 스토어에서 user info 상태값 가져오기

  // state 중에서 info를 선택
  const userInfo = useSelector((state)=>{
    console.log(state);
    return state.member.info;
  });

  console.log(userInfo);

  return (
    <HeaderContainer>
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* 사용자 정보가 없다면: 회원가입, 로그인 */}
            {/* 사용자 정보가 있다면: 로그아웃, 홈, 게시물관리, 회원관리 */}
            {/* 일반사용자: 게시물관리 */}
            {/* 관리자: 게시물관리, 회원관리 */}

            {
              userInfo === null ? 
              <>
                <Nav.Link href="/login">로그인</Nav.Link>
                <Nav.Link href="/register">회원가입</Nav.Link>
              </> 
              : 
              <>
              <Nav.Link onClick={
                ()=>{
                  // 로그아웃시 로그인데이터 초기화
                  // dispatch를 통해 logout 함수 호출
                  store.dispatch(logout());
                  // 로그아웃시 홈 화면으로 이동
                  navigate('/');
                }
              }>로그아웃</Nav.Link>   
              <Nav.Link href="/">홈</Nav.Link>
              </>
            }
            {/* 사용자정보가 있고 등급이 유저라면 */}
            {
              userInfo !== null && userInfo.role === 'ROLE_USER'
              && <Nav.Link href="/board/list">게시물관리</Nav.Link>
            }
            
            {/* 사용자정보가 있고 등급이 관리자라면 */}
            {
              userInfo !== null && userInfo.role === 'ROLE_ADMIN'
              && <>
                <Nav.Link href="/board/list">게시물관리</Nav.Link>
                <Nav.Link href="/board/list">회원관리</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </HeaderContainer>
  )
}

export default Header