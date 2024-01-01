import { useState } from "react";
import { useHref } from "react-router-dom";
import styled from "styled-components"

const Wrapper=styled.div` //최상단 태그 , 배경색 설정
  height: 100%;
  width: 100%;
  position: fixed;
  flex-direction: column;
  display: flex;
  overflow-y: auto;
  background-image: linear-gradient(to bottom, #ff9500, white 45%); 
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

const TodaysPlan=styled.div`
  margin-top: 5%;
  padding: 10%; 
  width: 90%;
  height: max-content;
  background-color: #ff9500;
  box-sizing: border-box;
  box-shadow: 1px solid black;
  border-radius: 20px;
  position: relative;
  text-align: center;
  color: white;
  font-weight: lighter;
  font-size: larger;
`;

const NoPlan=styled.div`
  margin-top: 10%;
  width: 70%;
`;
const Str=styled.div`
  padding: 15% 10%; 
  width: 100%;
  background-color: #ff9500;
  box-sizing: border-box;
  box-shadow: 1px solid black;
  border-radius: 20px;
  position: relative;
  text-align: center;
  color: white;
  font-weight: lighter;
  font-size: larger;
`;
const Dot=styled.div` 
  margin: 10% 0;
  text-align: center; 
`;

const Dot1=styled.p`
  font-size: larger;
  font-weight: 900; 
  padding-top: 7%;
`;
const Dot2=styled.p`
  font-size: larger;
  font-weight: 700;
  padding-top: 7%;
`;
const Dot3=styled.p`
  font-size: larger;
  font-weight: 500;
  padding-top: 7%;
`;
const AI=styled.span`
  font-weight: bold;
`;

const Title=styled.div`
  text-align: left; 
  font-size: medium;
  span{
    font-weight: 500;
  }
  margin-bottom: 3%;
`;

const PlanBlock= styled.div`
  padding: 3% 0;
  flex-direction: column;
  display: flex;
  text-align: left;
  font-size: medium;
  overflow-y: auto;
`;
const LocaNum=styled.span` 
  font-weight:500;
`;
const LocaTitle=styled.span` 
`;
const LocaDetail=styled.div`
  img{
    width: 35%;
    border-radius: 20px;
    padding: 3% 3%; 
  }
  flex-direction: row;
  display: flex;
  align-items: center; 
`;
const Dist=styled.div`
  margin: 5% 5%;   
`;
export default function MyPlan(){
  const [isPlaned, setIsPlaned]=useState(true);

  return (
    <Wrapper>
      <Upper>
        <Info>
          <p><Name>이민정</Name>&nbsp;
            <span>님, 오늘의 일정</span></p>
            <p><span>2023년 12월 23일 토요일</span></p>
        </Info> 
      </Upper>
      <Lower>
       {isPlaned? 
       <TodaysPlan>
        <Title><span>출발</span>&nbsp;&nbsp;인천광역시 인하로 100
        
            <Dist>도보 이용 약 5분 이상</Dist>
        </Title>
        <PlanBlock>
          <div><LocaNum>1</LocaNum>&nbsp;&nbsp;
          <LocaTitle>카페 하타가야</LocaTitle></div> 
          <LocaDetail> 
            <Dist>도보 이용 약 5분 이상</Dist> <img src="../../public/ex.jpg"/>
          </LocaDetail>
          
        </PlanBlock>
       </TodaysPlan> : 
       <NoPlan>
        <Str>현재 일정이 없어요 😭</Str>
        <Dot>
          <Dot1>.</Dot1>
          <Dot2>.</Dot2>
          <Dot3>.</Dot3>
        </Dot>
        <Str>
          <AI>" AI "</AI>&nbsp;
          <span>가 추천하는 일정 보기</span>
          </Str>
        </NoPlan>
        }         
      </Lower>
    </Wrapper>
  )
}