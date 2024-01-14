import { useState } from "react";
import styled from "styled-components"
import Dots from "../components/layout/dots"; 
import DetailPlan from "../components/detail-plan";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

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

export default function MyPlan(){
  const [isPlaned, setIsPlaned]=useState(false);
  const navigate=useNavigate();
  const user=auth.currentUser;
  const goToCreatePlan=()=>{
    navigate("/create-plan");
  };
  
  return (
    <Wrapper>
      <Upper>
        <Info>
          <p><Name>{user?.displayName?? "사용자"}</Name>&nbsp;
            <span>님, 오늘의 일정</span></p>
            <p><span>2023년 12월 23일 토요일</span></p>
        </Info> 
      </Upper>
      <Lower>
       {isPlaned? 
       <DetailPlan />
       : 
       <NoPlan>
        <Str>현재 일정이 없어요 😭</Str>
        <Dots />
        <Str onClick={goToCreatePlan}>
          <AI>" AI "</AI>&nbsp;
          <span>가 추천하는 일정 보기</span>
          </Str>
        </NoPlan>
        }         
      </Lower>
    </Wrapper>
  )
}