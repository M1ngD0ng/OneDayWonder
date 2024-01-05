import { styled } from "styled-components";
import Dots from "./layout/dots";
import { useState } from "react";

const PlanBlock= styled.div`
  margin-top: 5%;
  padding: 7% 10%;  
  background-color: #8A2BE2;
  box-shadow: 1px solid black;
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
const LocaNum=styled.span` 
  font-weight: bold;
  padding: 1% 2%;
  color: #8A2BE2;
  text-align: center;
  background-color: white;
  border-radius: 5px;
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
export default function PlanPlace(){
  const [isLastPlace, setLastPlace]=useState(false); // 마지막 장소일때는 Dot을 안붙임

  return(
    <>
    <PlanBlock> 
          <div><LocaNum>1</LocaNum>&nbsp;&nbsp;
          <LocaTitle>카페 하타가야</LocaTitle></div> 
          <LocaDetail> 
            <Dist>도보 이용 약 5분 이상</Dist> <img src="../../public/ex.jpg"/>
          </LocaDetail>
    </PlanBlock>
    {!isLastPlace && <Dots />}
    </>
  );
};