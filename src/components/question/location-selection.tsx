// LocationSelection.tsx (지역 선택 관련 컴포넌트)
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Ans, Ques, QuesBlock } from "./question";

// 지역 타입 정의
interface IRegion {
  station: string;
  prior: string;
  initial: string;
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

const LocationSelection = ({$updateAnswer}) => {
  // 지역 질문
  const [regionData, setRegionData] = useState<IRegion[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);
 // const [subRegions, setSubRegions] = useState<ISubRegion[]>([]);
 // const [selectedSubRegion, setSelectedSubRegion] = useState<ISubRegion | null>(null);
 // const [subRegions, setSubRegions] = useState<ISubRegion[]>([]);
 // const [selectedSubRegion, setSelectedSubRegion] = useState<ISubRegion | null>(null);

  const detailRef=useRef<HTMLDetailsElement>(null);
  //const subDetailRef=useRef<HTMLDetailsElement>(null);
  //const subDetailRef=useRef<HTMLDetailsElement>(null);

  const fetchRegionsData = async () => {
    const q = query(collection(db, "regions"),
      orderBy("prior","asc"));
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

  const handleSelectstation =(region: IRegion)=>{
    setSelectedRegion(region);

    if (detailRef.current){
      detailRef.current.removeAttribute('open');
    }
  };

  useEffect(()=>{
    if (selectedRegion){
      const combinedRegion = `${selectedRegion.initial || ""}`;
      $updateAnswer("location", combinedRegion); // 장소 데이터의 최상위 컬렉션이 이니셜로 되어있음
    }
  },[selectedRegion]);
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
                {selectedRegion ? selectedRegion.station : "Select A Region"}
              </Summary>
              <DropdownList role="listbox">
                {regionData.map((region) => (
                  <li key={region.prior} onClick={() => handleSelectstation(region)}>
                    {region.station}
                  </li>
                ))}
              </DropdownList>
            </details>
          </DropdownContainer>
        </Ans>
      </QuesBlock>
    </>
  );
};

export default LocationSelection;
