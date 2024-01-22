// LocationSelection.tsx (지역 선택 관련 컴포넌트)
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Ans, Ques, QuesBlock } from "./question";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

// 지역 타입 정의
interface IRegion {
  mainReg: string;
  prior: string;
  subReg: ISubRegion[];
}

interface ISubRegion {
  name: string;
}

// 스타일드 컴포넌트 정의
// const Wrapper = styled.div`
//   align-items: center;
//   flex-direction: column;
//   display: flex;
//   overflow-y: visible;
// `;
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
  width: 98%;
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

const LocationSelection = () => {
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
    console.log(subRegions);
  },[subRegions]);
  // 지역 선택과 관련된 상태 및 로직을 이곳에 작성
  return (
    <>
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
    </>
  );
};

export default LocationSelection;
