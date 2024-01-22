// MoodSelection.tsx (분위기 선택 관련 컴포넌트)
import React, { useState } from "react";
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
`;

const MoodSelection = () => {
  // 분위기 질문
  const moodOptions1 = ["연인과", "친구와", "가족모임"];
  const moodOptions2 = ["파티", "진지한 대화", "조용한"];
  const moodOptions3 = ["무드있는", "화려한", "역동적인"];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // 옵션을 선택 또는 해제할 때 호출되는 함수
  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      // 이미 선택된 옵션이면 선택 해제
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // 선택되지 않은 옵션이면 선택
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  // 분위기 선택과 관련된 상태 및 로직을 이곳에 작성
  return (
    <>
     <QuesBlock>
        <Ques>
          어떤 하루를 원하시나요 ?
        </Ques>
        <Ans>
          <TagDiv>
            {moodOptions1.map((option) => (
              <TagA
                key={option}
                $isSelected={selectedOptions.includes(option)}
                style={{ fontSize: 'medium' }}
                onClick={() => toggleOption(option)}
              >
                {option}
              </TagA>
            ))}
          </TagDiv>

          <TagDiv>
            {moodOptions2.map((option) => (
              <TagA
                key={option}
                $isSelected={selectedOptions.includes(option)}
                style={{
                  marginTop: '1%',
                  fontSize: 'medium'
                }} // 원하는 간격을 지정하세요
                onClick={() => toggleOption(option)}
              >
                {option}
              </TagA>
            ))}
          </TagDiv>
          <TagDiv>
            {moodOptions3.map((option) => (
              <TagA
                key={option}
                $isSelected={selectedOptions.includes(option)}
                style={{
                  marginTop: '1%',
                  fontSize: 'medium'
                }} // 원하는 간격을 지정하세요
                onClick={() => toggleOption(option)}
              >
                {option}
              </TagA>
            ))}
          </TagDiv>
        </Ans>
      </QuesBlock>
    </>
  );
};

export default MoodSelection;
