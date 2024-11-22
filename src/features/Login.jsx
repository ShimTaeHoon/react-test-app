import React, { useContext } from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Context } from '../index';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { login } from '../store/memberSlice';

// 로그인 데이터(아이디와 패스워드)를 받아서 로그인 요청을 하는 컴포넌트

const Login = () => {

  // navigate: 다른 페이지로 이동하는 도구
  const navigate = useNavigate();

  // dispatch: 스토어의 state를 변경하기 위한 도구
  const dispatch = useDispatch();

  // 로그인 데이터를 저장할 state 생성
  const [ user, setUser ] = useState();

  // 입력필드의 이벤트 함수 
  const handleChange = (event) => {
    
    // 이벤트가 발생한 엘리먼트에서 name과 value를 추출
    const { name, value } = event.target;

    // 복제본 생성
    const newUser = { ...user }

    // state에 새로운 데이터 업데이트
    newUser[name] = value;
    setUser(newUser);
    console.log(newUser);

  }

  // Context에서 API주소 가져오기
  const { host } = useContext(Context);

  // 폼태그의 이벤트 함수
  const handleSubmit = async (event) => {
    
    event.preventDefault();

    // 로그인 API 호출
    // 주소, 바디데이터
    const response = await axios.post(
      `${host}/login`
      , user
    );

    // 로그인에 성공했으면 로그인 state를 업데이트하고,
    // 홈화면으로 이동
    if(response.status === 200) {
      // console.log(response.data);
      // dispatch를 사용하여 login 액션함수를 호출 => 리듀서 실행됨
      dispatch(login(response.data));
      navigate('/');
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }

  }

  return (
    <CustomCard>
      <CustomContainer>
        <h3>로그인</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="member.id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name="id" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="member.password">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" name="password" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            로그인
          </Button>
        </Form>
      </CustomContainer>
    </CustomCard>
  )
}

export default Login