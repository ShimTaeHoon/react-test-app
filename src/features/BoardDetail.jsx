import React from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { useContext } from 'react';
import { Context } from '../index';

import { useSelector } from 'react-redux';

const BoardDetail = () => {

  // 파일 경로
  // const IMG_PATH = 'C://uploadfile/'
  // 파일 경로를 프로젝트 내부의 상대경로로 설정
  const IMG_PATH = '/image/';

  // 스토어에서 token state를 가져오기
  // const token = useSelector((state)=>{state.member.token});
  const token = useSelector((state)=>{
    return state.member.token;
  });

  console.log(token);

  // const board = { no:1, title:'1번', content:'1번입니다', writer:'둘리', regDate:'2024-11-08', modDate:'2024-11-08' }

  // 게시물 데이터
  // API를 통해서 게시물 데이터를 조회
  // 조회한 데이터를 화면에 표시!
  // let board = null;
  let [board, setBoard] = useState(null);

  const navigate = useNavigate();

  // URL에 포함되어 있는 파라미터 가져오기
  const params = useParams();

  const { host } = useContext(Context);

  // 게시물 조회 API 호출
  // useEffect: 컴포넌트가 생성될 때 코드를 한번만 실행(수행할코드, 빈배열(빈배열 넣으면 한번만실행))
  useEffect(()=>{

    // 함수 정의
    const apiCall = async () => {
      
        // 조회는 get
        // 인자: 주소, 헤더 + 파라미터
        // 주소: /board/read?no=1
        const response = await axios.get(
          `${host}/board/read?no=${params.no}`,
          {
            headers: { 
              // Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MzIwNjIxMzIsImV4cCI6MTczNDY1NDEzMiwic3ViIjoidXNlciJ9.eo4baZsliRRVthY316YWWhr2ohpvOhxVGtlAnlfNKNo'

              Authorization: token

            }
          }
        );

        // API 요청에 성공했으면 응답받은 게시물 데이터를 저장
        // 실패했으면 에러 발생시키기
        if(response.status === 200){
          console.log(response.data); // state 업데이트
          setBoard(response.data);
        } else {
          throw new Error(`api error: ${response.status} ${response.statusText}`);
        }

    }

    // 함수 호출
    apiCall();

  },[]);

  // 실제 파일은 존재하지만
  // 브라우저 정책에 의해 프로젝트 외부 경로에 접근할 수 없음!

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 상세</h3>

        { 
          board!==null && 
          <Form>
            <Form.Group className="mb-3" controlId="board.no">
              <Form.Label>번호</Form.Label>
              {/* <Form.Control type="text" value={board.no} readOnly/> */}
              <Form.Control type="text" value={board.no} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={board.title} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} value={board.content} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={board.writer} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control type="text" value={board.regDate} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control type="text" value={board.modDate} readOnly/>
            </Form.Group>

            
                        {

            board.imgPath!==null && 
            <img src={ `${IMG_PATH}${board.imgPath}` }></img>

            }

            <Button variant="primary" onClick={ ()=>{
       
              navigate(`/board/modify/${board.no}`);
            }} >수정</Button>

          </Form>
          
        }

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardDetail