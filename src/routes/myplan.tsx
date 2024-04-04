import { useState } from "react";
import styled from "styled-components"
import Dots from "../components/layout/dots"; 
import DetailPlan from "../components/detail-plan";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import moment from "moment";

import { StyledCalendarWrapper, StyledCalendar, StyledToday, StyledDot, StyledDate } from "../components/style/style-calendar";

const Wrapper=styled.div` //최상단 태그 , 배경색 설정
  height: 100%;
  width: 100%;
  position: fixed;
  flex-direction: column;
  display: flex;
  overflow-y: auto;
  background-image: linear-gradient(to bottom, #8A2BE2, white 45%); 
 `;

const Upper=styled.div`   
  width: 100%;
`
const Lower=styled.div`
  position: relative ;
  overflow-y: none;
  padding-top: 5%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30%;
 // margin-bottom: 5%;
  ::-webkit-scrollbar {
      display:none;
    }
`
const Info=styled.div`
  font-size: 25px; 
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-top: 20%;
  p{
    color: white;
    padding-bottom: 2%; 
    span{
      font-weight: lighter;
    }
  }
`;
const Name=styled.span`
  font-weight: bold !important; 
`;



const NoPlan=styled.div`
  margin-top: 10%;
  width: 70%;
`;
const Str=styled.div`
  padding: 15% 10%; 
  width: 100%;
  background-color: #9B4DE3;
  box-sizing: border-box;
  box-shadow: 1px 2px 3px grey;
  border-radius: 20px;
  position: relative;
  text-align: center;
  color: white;
  font-weight: lighter;
  font-size: larger;
`;

const AI=styled.span`
  font-weight: bold;
`;


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function MyPlan(){
  // const [isPlaned, setIsPlaned]=useState(false);
  const navigate=useNavigate();
  const user=auth.currentUser;
  const goToCreatePlan=()=>{
    navigate("/create-plan");
  };
  
  
  // return (
  //   <Wrapper>
  //     <Upper>
  //       <Info>
  //         <p><Name>{user?.displayName?? "사용자"}</Name>&nbsp;
  //           <span>님, 오늘의 일정</span></p>
  //           <p><span>2023년 12월 23일 토요일</span></p>
  //       </Info> 
  //     </Upper>
  //     <Lower>
  //      {isPlaned? 
  //      <DetailPlan />
  //      : 
  //      <NoPlan>
  //       <Str>현재 일정이 없어요 😭</Str>
  //       <Dots />
  //       <Str onClick={goToCreatePlan}>
  //         <AI>" AI "</AI>&nbsp;
  //         <span>가 추천하는 일정 보기</span>
  //         </Str>
  //       </NoPlan>
  //       }         
  //     </Lower>
  //   </Wrapper>
  // )


  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const attendDay = ["2023-12-03", "2023-12-13"]; // 출석한 날짜 예시

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <Wrapper>
      <Upper>
        <Info>
          <p><Name>{user?.displayName?? "사용자"}</Name>&nbsp;
            <span>님, 오늘의 일정</span></p>
            <p><span>{today.getFullYear()}년 {today.getMonth()+1}월 {today.getDay()}일</span></p>
        </Info> 
      </Upper>
      <StyledCalendarWrapper>
        <StyledCalendar
          value={date}
          onChange={handleDateChange}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          // 오늘 날짜로 돌아오는 기능을 위해 필요한 옵션 설정
          activeStartDate={
            activeStartDate === null ? undefined : activeStartDate
          }
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          // 오늘 날짜에 '오늘' 텍스트 삽입하고 출석한 날짜에 점 표시를 위한 설정
          tileContent={({ date, view }) => {
            let html = [];
            if (
              view === "month" &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              html.push(<StyledToday key={"today"}>오늘</StyledToday>);
            }
            if (
              attendDay.find((x) => x === moment(date).format("YYYY-MM-DD"))
            ) {
              html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
            }
            return <>{html}</>;
          }}
        />
        <StyledDate onClick={handleTodayClick}>오늘</StyledDate>
      </StyledCalendarWrapper>
    </Wrapper>
  )
}