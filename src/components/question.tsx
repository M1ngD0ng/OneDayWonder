import { useState } from "react";
import { styled } from "styled-components";
import Dots from "./layout/dots";

const Wrapper=styled.div` 
  align-items: center;
  flex-direction: column;
  display: flex;
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
  overflow-y: auto; 
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
export default function Question(){
  const [isLastQues, setLasQues]=useState(false);
  return(
    <Wrapper>
    <QuesBlock> 
      <Ques>
      오늘은 ___ 명이서 하루를 보낼 거에요 !
      </Ques>
      <Ans>
      <TagDiv>
          <TagA href='#'> 1명 </TagA>
          <TagA href='#'> 2명 </TagA>
          <TagA href='#'> 3명 </TagA>
          <TagA href='#'> 4명 </TagA>
      </TagDiv>
      <TagDiv>
          <TagA href='#'> 5명 </TagA>
          <TagA href='#'> 6명 </TagA>
          <TagA href='#'> 7명 이상 </TagA>
      </TagDiv>
      </Ans>
    </QuesBlock>
    {!isLastQues && <Dots />}
    <QuesBlock> 
      <Ques>
      _____ 부터 _____ 까지 놀 거에요!
      </Ques>
      <Ans>
      <TagDiv>
          <TagA href='#'> 2023년 </TagA>
          <TagA href='#'> 12월 </TagA>
          <TagA href='#'> 23일 </TagA>
      </TagDiv>
      </Ans>
    </QuesBlock>
    {!isLastQues && <Dots />}
    </Wrapper>
  )
}