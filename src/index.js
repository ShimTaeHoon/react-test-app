import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';

import store from './store/store';
import { Provider } from 'react-redux';

import { login } from './store/memberSlice'

// Context 생성
// Context: 여러 컴포넌트에서 값을 공유할 때 사용
// Store, Slice: 여러 컴포넌트에서 state를 공유할 때 사용
export const Context = createContext();

// index.js : 앱의 시작점

// 앱이 시작될 때 스토리지에 있는 로그인 정보를 확인하여 
// 로그인 상태를 유지

// 로컬 스토리지에서 로그인 데이터 꺼내기
let info = localStorage.getItem('info');
let token = localStorage.getItem('token');

// console.log(info, token);

// dispatch를 사용하여 login 액션 함수 호출
if(info !== null){
  // json string => object
  const loginData = { user: JSON.parse(info), token: token }
  console.log(loginData);
  store.dispatch(login(loginData));
}

// API 서버 주소
// let host = 'http://localhost:8080';

// AWS API 주소로 변경
// let host = 'http://ec2-43-203-192-152.ap-northeast-2.compute.amazonaws.com:8080';
// let host = 'http://43.203.192.152:8080';

// 로컬 컴퓨터에서 React App을 실행할 때는
// API 주소도 localhost로 설정
// 그렇지 않으면 (Netlify에서) AWS 서버로 설정
let host;
if(window.location.hostname === 'localhost'){
  host = 'http://localhost:8080';
} else {
  // host = 'http://43.203.192.152:8080';
  host = '/api';
}

console.log(host);

// Router: URL 주소에따라 화면을 전환하는 기능
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 앱에 라우터 설정
  <BrowserRouter>
    <React.StrictMode>
      {/* Context.Provider로 App컴포넌트 감싸기 */}
      {/* Provider value: 하위 컴포넌트들에게 host 데이터 전달 */}
      {/* Provider store: 하위 컴포넌트들이 state를 공유 */}
      <Context.Provider value={ {host} }>
        <Provider store={store}>
          <App />
        </Provider>
      </Context.Provider>
    </React.StrictMode>
  </BrowserRouter>
);