import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Dots from "../layout/dots";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import 'react-datepicker/dist/react-datepicker.css';
import React from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import LocationSelection from "./location-selection";
import PeopleSelection from "./people-selection";
import DateSelection from "./date-selection";
import MoodSelection from "./mood-selection";

const Wrapper = styled.div` 
  align-items: center;
  flex-direction: column;
  display: flex;
  overflow-y: visible;
`;
export const QuesBlock = styled.div`
  margin-top: 2%;
  padding: 7% 10%;  
  width: 90%;
  background-color: #9B4DE3; 

  box-shadow: 1px 2px 3px grey;
  border-radius: 20px;
  position: relative; 
  color: white;
  font-weight: lighter; 
 
  height: max-content;
  flex-direction: column;
  display: flex;
  text-align: left;
  font-size: medium;
`;

export const Ques = styled.div`
  text-align: center;
  font-size: large;
  font-weight: bolder;
  margin-bottom: 3%;
`;

export const Ans = styled.div`
  font-size: small;
  font-weight: bolder;
`;

export default function Question() {
  const [selectedAnswers, setSelectedAnswers] = useState({
    location: null,
    date: null,
    people: null,
    mood: [],
  });

  const updateAnswer = (category, value) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: value,
    }));
  };

  
  // const dispatch=useDispatch();

  // const handleAnswer=(category, value)=>{
  //   dispatch(updateAnswer({category, value}));

  // // Firebase 데이터베이스 경로 설정
  // const answerRef = ref(db, 'selections/' + category);

  // // Firebase 데이터베이스에 데이터 저장
  // set(answerRef, value).catch((error) => {
  //   console.error("Firebase 데이터 저장 실패: ", error);
  // });
  // };
  return (
    <Wrapper>
      <DateSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <LocationSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <PeopleSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <MoodSelection $updateAnswer={updateAnswer}/>
    </Wrapper>
  )
};