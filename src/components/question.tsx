import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Dots from "./layout/dots";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import 'react-datepicker/dist/react-datepicker.css';
import React from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

// 지역 타입 정의
interface IRegion {
  mainReg: string;
  prior: string;
  subReg: ISubRegion[];
}

interface ISubRegion {
  name: string;
}
const Wrapper = styled.div` 
  align-items: center;
  flex-direction: column;
  display: flex;
  overflow-y: visible;
`;
const QuesBlock = styled.div`
  margin-top: 2%;
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

const Ques = styled.div`
  text-align: center;
  font-size: large;
  font-weight: bolder;
  margin-bottom: 3%;
`;

const Ans = styled.div`
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

  ${(props) => props.$isSelected && `...props.style`}
`;
 
const DatePick = styled(DatePicker)`
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
  caret-color: transparent;
  outline: none !important;
  box-shadow: none !important;
`;

// 스타일드 컴포넌트 정의
const DropdownContainer = styled.div`
  position: relative;
  margin-top: 5%;
  display: flex;
  justify-content: center;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  max-height: 200px; // 최대 높이를 픽셀 또는 다른 단위로 설정
  overflow-y: scroll; // 스크롤 가능하도록 설정
  background: white;
  list-style: none;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transform: translateX(3%);
`;


const Summary=styled.summary`
  background-color: #BB91E3;
  outline: none; /* 포커스 테두리 제거 */
  cursor: pointer; 
  margin: 0 2%;
  font-size: medium;
  border-radius: 10px; /* 드롭다운의 둥근 모서리 */


  &:focus {
    outline: none; /* 포커스 상태일 때 테두리 제거 */
  }
`;
export default function Question() {
  // 지역 질문
  const [regionData, setRegionData] = useState<IRegion[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);
  const [subRegions, setSubRegions] = useState<ISubRegion[]>([]);
  const [selectedSubRegion, setSelectedSubRegion] = useState<ISubRegion | null>(null);

  const detailRef=useRef<HTMLDetailsElement>(null);
  const subDetailRef=useRef<HTMLDetailsElement>(null);

  const fetchRegionsData = async () => {
    const q = query(collection(db, "region"),
      orderBy("prior", "asc"));
    const querySnapshot = await getDocs(q);

    const regions=querySnapshot.docs.map(doc=>({
      _id: doc.id,
      ...doc.data() as IRegion
    }));
    setRegionData(regions);
  }
  useEffect(() => {
    fetchRegionsData(); 
  }, []);

  useEffect(()=>{
    console.log('sub',subRegions);
  },[subRegions]);

  const handleSelectMainRegion =(region: IRegion)=>{
    setSelectedRegion(region);
    setSubRegions(region.subReg || []);
    setSelectedSubRegion(null); // 두 번째 드롭다운의 선택을 초기화
    if (detailRef.current){
      detailRef.current.removeAttribute('open');
    }
  };

  const handleSelectSubRegion =(subRegion: ISubRegion)=>{
    setSelectedSubRegion(subRegion);
    if (subDetailRef.current){
      subDetailRef.current.removeAttribute('open');
    }
  };

  useEffect(()=>{
    console.log(selectedSubRegion);
  },[selectedSubRegion]);
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

  const handleSelectPeople = (count) => {
    setSelectedPeople(count);
    setIsSelectPeople(true);
  };

  // 날짜 질문
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  const currentDay = currentDate.getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [day, setDay] = useState(currentDay);
  const selectedDate = new Date(year, month - 1, day);

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
    regionData.sort((a,b)=>a.prior.localeCompare(b.prior));
  };
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
  return (
    <Wrapper>
      <QuesBlock>
        <Ques>
          언제 ?? 일정인가요 ?
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
              dateFormat="yyyy . MM . dd"
            />
          </TagDiv>
        </Ans>
      </QuesBlock>
      <Dots />
      <QuesBlock>
        <Ques>
          어디서 일정을 보내실 건가요 ?
        </Ques>
        <Ans>
          <DropdownContainer>
            <details ref={detailRef} role="list">
              <Summary aria-haspopup="listbox" role="button">
                {selectedRegion ? selectedRegion.mainReg : "Select a region"}
              </Summary>
              <DropdownList role="listbox">
                {regionData.map((region) => (
                  <li key={region.prior} onClick={() => handleSelectMainRegion(region)}>
                    {region.mainReg}
                  </li>
                ))}
              </DropdownList>
            </details>
          </DropdownContainer>
          {selectedRegion && selectedRegion.subReg && selectedRegion.subReg.length>0 && (
            <DropdownContainer >
            <details ref={subDetailRef} role="list">
              <Summary aria-haspopup="listbox" role="button">
              {selectedSubRegion ? selectedSubRegion : "Select a sub region"}
              </Summary>
              <DropdownList role="listbox">
                {selectedRegion.subReg.map((subRegion, index)=>(
                  <li key={`${subRegion.name}-${index}`} onClick={() => handleSelectSubRegion(subRegion)}>
                    {subRegion}
                  </li>
                ))}
              </DropdownList>
            </details>
          </DropdownContainer>
          )}
          
          

        </Ans>
      </QuesBlock>

      <Dots />
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
      <Dots />
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
    </Wrapper>
  )
};