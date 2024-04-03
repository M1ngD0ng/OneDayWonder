// PeopleSelection.tsx (인원 선택 관련 컴포넌트)
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Ans, Ques, QuesBlock } from "./question";

// 스타일드 컴포넌트 정의
const TagDiv = styled.div`
  margin-top: 5%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const TagA = styled.div<{$isSelected: boolean}>`
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
`;

const PeopleSelection = ({$updateAnswer}) => {
   // 인원 질문
   const [isSelectPeople, setIsSelectPeople] = useState(false);
   const [selectedPeople, setSelectedPeople] = useState(0);
 
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
 
   const handleSelectPeople = (count: number) => {
     setSelectedPeople(count);
     setIsSelectPeople(true);
   };

   useEffect(()=>{
    $updateAnswer("people",selectedPeople);
   },[selectedPeople]);
  // 인원 선택과 관련된 상태 및 로직을 이곳에 작성
  return (
    <>
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
    </>
  );
};

export default PeopleSelection;
