import { useState } from "react";
import { styled } from "styled-components";
import Dots from "./layout/dots";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import 'react-datepicker/dist/react-datepicker.css';

const Wrapper=styled.div` 
  align-items: center;
  flex-direction: column;
  display: flex;
  overflow-y: visible;
`;
const QuesBlock= styled.div`
  margin-top: 5%;
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
const TagA = styled.a`
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
  
  const [people, setPeople]=useState(0);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const currentDay = currentDate.getDate();
  
  // 각각의 상태 초기화
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);

  const selectedDate = new Date(year, month - 1, day);

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
      오늘은 ___ 명이서 하루를 보낼 거에요 !
      </Ques>
      <Ans>
      <TagDiv>
          <TagA onClick={()=>setPeople(1)}> 1명 </TagA>
          <TagA onClick={()=>setPeople(2)}> 2명 </TagA>
          <TagA onClick={()=>setPeople(3)}> 3명 </TagA>
          <TagA onClick={()=>setPeople(4)}> 4명 </TagA>
      </TagDiv>
      <TagDiv>
          <TagA onClick={()=>setPeople(5)}> 5명 </TagA>
          <TagA onClick={()=>setPeople(6)}> 6명 </TagA>
          <TagA onClick={()=>setPeople(7)}> 7명 이상 </TagA>
      </TagDiv>
      </Ans>
    </QuesBlock>
    <Dots />
    <QuesBlock> 
      <Ques>
      _____ 부터 _____ 까지 놀 거에요!
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
        dateFormat="yyyy / MM / dd"
      />
      </TagDiv>
      </Ans>
    </QuesBlock>
    <Dots />
    <QuesBlock> 
      <Ques>
      _____ 부터 _____ 까지 놀 거에요!
      </Ques>
      <Ans>
      <TagDiv>
      <DatePick
        onChange={(date) => {
          setYear(date.getFullYear());
          setMonth(date.getMonth() + 1);
          setDay(date.getDate());

        }}
        selected={selectedDate}
        dateFormat="yyyy / MM / dd"
      />
      </TagDiv>
      </Ans>
    </QuesBlock>
    </Wrapper>
  )
};