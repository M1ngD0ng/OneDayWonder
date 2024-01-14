//리듀서는 애플리케이션의 상태를 변경하는 순수 함수입니다. 액션을 받아 새 상태를 반환합니다.

import { UPDATE_ANSWER } from '../actions/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answers: {}
};

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ANSWER:
      const { category, value } = action.payload;
      return {
        ...state,
        answers: {
          ...state.answers,
          [category]: value
        }
      };
    default:
      return state;
  }
};

export default answerReducer;

// 예를 들어 selectionSlice를 생성합니다.

// const initialState = {
//   // 초기 상태를 여기에 정의하세요
//   people: 0, // 예시
// };

// const answerSlice = createSlice({
//   name: 'answer',
//   initialState,
//   reducers: {
//     updateAnswer: (state, action) => {
//       // action.payload에는 { category, value } 객체가 포함되어 있습니다.
//       console.log(action)
//       const { category, value } = action.payload;
//       state[category] = value;
//     },
//   },
// });
// export const { updateAnswer } = answerSlice.actions;
// export default answerSlice.reducer;