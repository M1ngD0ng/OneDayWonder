// reducers/index.js
import { combineReducers } from 'redux';
import answerSlice from './answerReducer';
import answerReducer from './answerReducer';

const rootReducer = combineReducers({
  answer: answerReducer,
  // 다른 리듀서들이 있다면 여기에 추가
});
export default rootReducer;
