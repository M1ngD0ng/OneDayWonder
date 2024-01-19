import { useState } from "react";
import { styled } from "styled-components";
import Dots from "./layout/dots";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import 'react-datepicker/dist/react-datepicker.css';
import React from "react";

const Wrapper=styled.div` 
  align-items: center;
  flex-direction: column;
  display: flex;
  overflow-y: visible;
`;
const QuesBlock= styled.div`
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

const Ques=styled.div`
  text-align: center;
  font-size: large;
  font-weight: bolder;
  margin-bottom: 3%;
`;

const Ans=styled.div`
  font-size: small;
  font-weight: bolder;
`;
const TagDiv = styled.div`
    margin-top: 5%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

const TagA = styled.div`
  width: max-content;
  background-color: ${(props) => (props.$isSelected ? "#AB6FE3" : "#BB91E3")};
  font-weight: ${(props) => (props.$isSelected ? "bolder" : "initial")};
  color: white; 
  border-radius: 10px;
  padding: 3% 5%;
  margin: 0 2%;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 2px 5px grey;

  ${(props) => props.$isSelected && `...props.style`}
`;

const DatePick= styled(DatePicker)`
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
`;
export default function Question(){
  const [isSelectPeople, setIsSelectPeople] =useState(false);
  const [selectedPeople, setSelectedPeople] = useState('___');

  const peopleOptions = [
    { value: 1, label: '1명' },
    { value: 2, label: '2명' },
    { value: 3, label: '3명' },
    { value: 4, label: '4명' },
  ];
  const peopleOptionsSecondRow = [
    { value: 5, label: '5명' },
    { value: 6, label: '6명' },
    { value: 7, label: '7명 이상' },
  ];
  
  const handleSelectPeople = (count) => {
    setSelectedPeople(count);
    setIsSelectPeople(true);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const currentDay = currentDate.getDate();
  
  // 각각의 상태 초기화
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  const selectedDate = new Date(year, month - 1, day);


  const moodOptions1 = ["연인", "친구", "가족모임"];
  const moodOptions2 = ["파티", "진지한 대화", "조용한"];
  const moodOptions3 = ["무드있는", "화려한", "역동적인"];
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
  return(
    <Wrapper>
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
    <Dots />
    <QuesBlock> 
      <Ques>
      어디서 일정을 보내실 건가요 ?
      </Ques>
      <Ans>
      <TagDiv>
      </TagDiv>
      </Ans>
    </QuesBlock>
    
    <Dots />
    <QuesBlock> 
      <Ques>
      몇 명이 함께하는 일정인가요 ?
      </Ques>
      <Ans>
      <TagDiv>
        {peopleOptions.map((option) => (
          <TagA
            key={option.value}
            $isSelected={selectedPeople === option.value}
            onClick={() => handleSelectPeople(option.value)}
          >
            {option.label}
          </TagA>
        ))}
      </TagDiv>

      <TagDiv>
        {peopleOptionsSecondRow.map((option) => (
          <TagA
            key={option.value}
            $isSelected={selectedPeople === option.value}
            onClick={() => handleSelectPeople(option.value)}
            style={{ marginTop: '1%' }} // 원하는 간격을 지정하세요
          >
            {option.label}
          </TagA>
        ))}
      </TagDiv>
      </Ans>
    </QuesBlock>
    {isSelectPeople && selectedPeople!==1 ?  
    <>
    <Dots />
    <QuesBlock> 
      <Ques>
      어떤 분위기의 모임인가요 ?
      </Ques>
      <Ans>
      <TagDiv>
        {moodOptions1.map((option) => (
          <TagA
            key={option}
            style={{ fontSize: 'medium'}}
          >
            {option}
          </TagA>
        ))}
      </TagDiv>

      <TagDiv>
        {moodOptions2.map((option) => (
          <TagA
            key={option}
            style={{ marginTop: '1%',
                    fontSize: 'medium' }} // 원하는 간격을 지정하세요
          >
            {option}
          </TagA>
        ))}
      </TagDiv>
      <TagDiv>
        {moodOptions3.map((option) => (
          <TagA
            key={option}
            style={{ marginTop: '1%',
                    fontSize: 'medium' }} // 원하는 간격을 지정하세요
          >
            {option}
          </TagA>
        ))}
      </TagDiv>
      </Ans>
    </QuesBlock></> : <></>}
    </Wrapper>
  )
};