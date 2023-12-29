import { styled } from "styled-components";
import '@picocss/pico';
import { useState } from "react";
import TodaysPlan from "../components/todaysplan";
import { Navigate, useNavigate } from "react-router-dom";

const Wrapper=styled.div`
  height: 100vh;
  flex-direction: column;
  display: flex;
  background-color: #ff9500;
 `;
const H1 = styled.h1`
  color: white;
  margin-top: 5%;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 5%;
`;
const Grid = styled.div`
  margin-left: 5%;
  margin-right: 5%;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 50px;
`;
const SearchInput = styled.input`
  border: 0px;
  background-color: none;
  border-radius: 4px;
  float: left;
  width: 70%;
  margin: 0px !important;
  height: 30px;
  padding-left: 30px !important;
  :focus {
    outline: none;
  }
`;
const SearchBtn = styled.button`
  border: 0px;
  outline: none;
  float: right;
  width: 30%;
  background-color: transparent;
  margin: 0px;
  :focus{
    outline: none;
  }
  svg {
    color: #ff9500;
    height: 30px;
  }
`;
const Today = styled.div`
  background-color: white;
  border-radius: 30px;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  padding-top: 3%;
  padding-bottom: 3%;
  display: flex;
  flex-direction: column;
`;
const Small = styled.small`
  font-size: 25px;
  color: #ff9500;
  font-weight: 600;
`;
const TodayBtn = styled.button`
  width: 40%;
  margin-top: 5%;
  margin-left: 30%;
  margin-right: 30%;
  background-color: #ff9500;
  color: white;
  border: 0px;
  border-radius: 10px;
`;
const NoPlan = styled.small`
  margin-top: 5%;
  color: #ff9500;
  font-weight: 400;
`;

export default function Home(){
  const navigate = useNavigate();
  const [isTodays, setTodays]=useState(true);
  const onPlanClick = async () => {
    try {
      navigate("/myplan");
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Wrapper>
      <H1> One Day Wonder </H1>
      <Grid className="grid">
        <Search>
          <SearchInput type="text" placeholder="가고 싶은 지역/장소를 검색하세요" />
          <SearchBtn type="submit">
            <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </SearchBtn>
        </Search>
        <Today>
          <Small> 오늘의 일정 </Small>
          {isTodays? <NoPlan> 오늘의 일정이 없습니다 </NoPlan>:<TodaysPlan/>}
          <TodayBtn onClick={onPlanClick}> 일정 수정하기 </TodayBtn>
        </Today>
      </Grid>
    </Wrapper>
  )
}