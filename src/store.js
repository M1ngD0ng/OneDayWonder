// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index'; // 위에서 정의한 루트 리듀서

const store = configureStore({
  reducer: rootReducer,
  // 여기에 미들웨어 설정이나 devTools 설정을 추가할 수 있습니다.
  devTools: process.env.NODE_ENV !== 'production', // 개발 환경에서만 DevTools를 활성화합니다.
  });
  
  export default store;