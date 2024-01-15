// 액션 생성자는 액션 객체를 반환하는 함수입니다. 이 객체는 스토어에 보내지는 정보를 포함하고 있습니다.

import { UPDATE_ANSWER } from './types';

export const updateAnswer = (answer) => {
  console.log(answer); //이건 제대로 들어옴
  return {
    type: UPDATE_ANSWER,
    payload: answer,
  };
};