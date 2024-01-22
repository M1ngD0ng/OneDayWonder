// DateSelection.tsx (날짜 선택 관련 컴포넌트)
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Ans, Ques, QuesBlock } from "./question";

const TagDiv = styled.div`
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

// 스타일드 컴포넌트 정의
const DatePick = styled(DatePicker)`
  width: max-content;
  background-color: #BB91E3;
  color: white;
  border-radius: 10px;
  padding: 3% 5%;
  margin: 0 2%;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 2px 5px grey;
  caret-color: transparent;
  outline: none !important;
  box-shadow: none !important;
`;

const DateSelection = ({$updateAnswer}) => {
  // 날짜 질문
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const currentDay = currentDate.getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  const selectedDate = new Date(year, month - 1, day);

  // 날짜가 변경될 때마다 부모 컴포넌트에 선택한 날짜를 업데이트합니다.
  const handleDateChange = (date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setDay(date.getDate());
    
  };
  useEffect(()=>{
    $updateAnswer("date", [year,month,day]); // 선택한 날짜를 부모 컴포넌트로 전달
  },[year,month,day])

  return (
    <>
    <QuesBlock>
        <Ques>
          일정 추천을 원하시는 날짜를 알려주세요 !
        </Ques>
        <Ans>
          <TagDiv>
            <DatePick
              onChange={handleDateChange}
              selected={selectedDate}
              dateFormat="yyyy . MM . dd"
            />
          </TagDiv>
        </Ans>
      </QuesBlock>
      </>
  );
};

export default DateSelection;
