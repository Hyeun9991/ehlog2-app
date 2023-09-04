import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducers';

/**
 * 로컬 스토리지에서 불러온 사용자 정보 /
 * 'account' 키로 저장된 사용자 정보를 불러옴. 없으면 null로 초기화.
 */
const userInfoFormStorage = localStorage.getItem('account')
  ? JSON.parse(localStorage.getItem('account'))
  : null;

const initialState = {
  user: {
    userInfo: userInfoFormStorage,
  },
};

// Redux store 생성 및 초기 상태 설정
const store = configureStore({
  reducer: {
    user: userReducer, // userReducer를 'user' 슬라이스의 리듀서로 설정
  },
  preloadedState: initialState, // 초기 상태 설정
});

export default store;
