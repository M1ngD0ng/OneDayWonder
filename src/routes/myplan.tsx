import styled from "styled-components"

const Wrapper=styled.div` //최상단 태그 , 배경색 설정
  height: 100%;
  width: 100%;
  position: fixed;
  flex-direction: column;
  display: flex;
  background-image: linear-gradient(to bottom, #ff9500, white 45%);
 `;

const Upper=styled.div`   
  width: 100%;
`
const Info=styled.div`
  font-size: 25px;
  color: white; 
  flex-direction: row;
  display: flex;
  justify-content: center;
  margin-top: 20%;
`;
const Name=styled.span`
  font-weight: bold;
`;

export default function MyPlan(){
  return (
    <Wrapper>
      <Upper>
        <Info>
            <Name>이민정</Name>&nbsp;
            <span>님, 오늘의 일정</span><br></br>
            <span>2023년 12월 23일 토요일</span>
          </Info> 
      </Upper>
    </Wrapper>
  )
}