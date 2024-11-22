import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'


const LayoutContainer = styled.div`
  background-color: #e9ecef;
  display: flex;
  flex-direction: column; 
  align-items: center; 
`;

// Outlet: 자식 컴포넌트가 들어오는 자리
// 예: /login => Outlet 대신 <Login/> 컴포넌트가 들어옴... 대체가 되는 위치

const Layout = () => {
  return (
    <LayoutContainer>
      <Header></Header> {/* 메뉴바 */}
      <Outlet></Outlet> {/* 상세 화면 */}
    </LayoutContainer>
  )
}

export default Layout