// DateSelection.tsx (날짜 선택 관련 컴포넌트)
import React, { useState } from "react";
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

const DateSelection = () => {
  // 날짜 질문
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const currentDay = currentDate.getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  const selectedDate = new Date(year, month - 1, day);

  // 날짜 선택과 관련된 상태 및 로직을 이곳에 작성
  return (
    <>
    <QuesBlock>
        <Ques>
          언제 ?? 일정인가요 ?
        </Ques>
        <Ans>
          <TagDiv>
            <DatePick
              onChange={date => {
                setYear(date.getFullYear());
                setMonth(date.getMonth() + 1);
                setDay(date.getDate());
              }}
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
