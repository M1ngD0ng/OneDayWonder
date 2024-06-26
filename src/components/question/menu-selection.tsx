import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Ans, Ques, QuesBlock } from "./question";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

// 지역 타입 정의
interface IMenu {
  title: string;
  prior: string;
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

const MenuSelection = ({$updateAnswer}) => {
  // 지역 질문
  const [menuData, setMenuData] = useState<IMenu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null);

  const detailRef=useRef<HTMLDetailsElement>(null);

  const fetchMenusData = async () => {
    const q = query(collection(db, "menus"),
      orderBy("prior","asc"));
    const querySnapshot = await getDocs(q);

    const menus=querySnapshot.docs.map(doc=>({
      _id: doc.id,
      ...doc.data() as IMenu
    }));
    console.log(menus);
    setMenuData(menus);
  }
  useEffect(() => {
    fetchMenusData(); 
  }, []);

  const handleSelectMenu =(menu: IMenu)=>{
    setSelectedMenu(menu);

    if (detailRef.current){
      detailRef.current.removeAttribute('open');
    }
  };

  useEffect(()=>{
    if (selectedMenu){
      //const combinedRegion = `${selectedRegion.initial || ""}`;
      $updateAnswer("menu", selectedMenu.title); // 장소 데이터의 최상위 컬렉션이 이니셜로 되어있음
    }
  },[selectedMenu]);
  return (
    <>
      <QuesBlock>
        <Ques>
        어떤 식사 메뉴를 원하시나요 ?
        </Ques>
        <Ans>
          <DropdownContainer>
            <details ref={detailRef} role="list">
              <Summary aria-haspopup="listbox" role="button">
                {selectedMenu ? selectedMenu.title : "Select A Menu"}
              </Summary>
              <DropdownList role="listbox">
                {menuData.map((menu) => (
                  <li key={menu.prior} onClick={() => handleSelectMenu(menu)}>
                    {menu.title}
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

export default MenuSelection;
