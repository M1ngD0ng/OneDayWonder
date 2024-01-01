import styled from "styled-components"
import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";


interface ItemDetail{
  title: string;
  description: string;
  img: string;
}
const Wrapper=styled.div` //최상단 태그 , 배경색 설정
  height: 100%;
  position: fixed;
  flex-direction: column;
  display: flex;
  background-image: linear-gradient(to bottom, #ff9500, white 45%);
 `;

const Upper=styled.div`   
  width: 100%;
`
const Lower=styled.div`
  position: relative ;
  overflow-y: scroll;
  padding-top: 5%;
  margin-bottom: 5%;
  ::-webkit-scrollbar {
      display:none;
    }
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

const Order=styled.div`
  margin-top: 10%;
  button{
    font-weight: lighter;
    color: grey;
    font-size: 16px;
    width: max-content;
    float: right;
    margin-left: 1%;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: inherit;
    .active{
      font-weight: bolder;
    }
  }
`;

const Category=styled.div`
  div{
    margin-left: 5%;
    float: left;
    margin-bottom: 3%;
    font-weight: lighter;
  }
`;

const Content=styled.div`
  box-shadow: 1px solid;
  flex-direction: column;
  width: 95%; 
  display: flex;  
  div{
    margin: 10px; 
  }
`;
const Onediv=styled.div`
  border: 1px;
  flex-direction: row;
  box-shadow: 0px 5px 5px lightgrey;
  border-radius: 15px;
  width: 90%; 
  height: fit-content;
  padding: 4%; 
  background-color: white;
  img {
    width: 20%;
    border-radius: 10px; 
    float: left;
  }
  div{
    width: 70%;
  }
  h3{
    font-weight: bold;
    padding-bottom: 5%;
  }
  p{ 
    font-size: smaller; 
    flex: 1; 
  }
`;
const Reco=styled.div`
  flex-direction: column;
  display: flex;
  overflow-x: scroll;
  margin-bottom: 40%;
  ::-webkit-scrollbar {
      display:none;
    }
  
  
`
const RecoContent=styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 100%;
  height: 100%;
  overflow-y: hidden;  
  /* overflow-x: scroll; 
  box-shadow: 1px solid; 
  flex-direction: row;
  display: flex;
  width: 90%;
   */
  box-shadow: 1px solid;  
  div{
    margin: 10px; 
  }
`;
const OneRecoDiv=styled.div`
  flex: 0 0 auto; // flex 아이템의 크기 조정
  box-shadow: 0px 5px 5px lightgrey;
  border-radius: 15px;
  width: 90%; // 너비 설정
  height: fit-content; // 높이 설정
  padding: 4%; // 패딩 설정
  background-color: white; // 배경색 설정
  margin: 10px; // 마진 설정
  display: flex; // flexbox 활성화
  flex-direction: row; // 행 방향으로 요소 배치

  img {
    width: 20%;
    border-radius: 10px;
    float: left;
  }

  div {
    width: 70%;
  }

  h3 {
    font-weight: bold;
    padding-bottom: 5%;
  }

  p { 
    font-size: smaller;
    flex: 1;
  }
`;
const StyledModal =styled(Modal)` 
  align-items: baseline;
  flex-direction: column;
  display: flex;
  width: 70%;
`
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0); // 배경을 투명하게 설정
`;
// 임시 데이터
const tempData = [
  { id: 1, title: "국제식당", description: "인천광역시 남구 용현동 194-19번지", img: "../../../public/ex.jpg" },
  { id: 2, title: "카페 하타가야", description: "인천광역시 미추홀구 용현동 195 28번지 2층", img: "../../../public/ex.jpg" },
  { id: 3, title: "국제식당", description: "인천광역시 남구 용현동 194-19번지", img: "../../../public/ex.jpg" },
  { id: 4, title: "카페 하타가야", description: "인천광역시 미추홀구 용현동 195 28번지 2층", img: "../../../public/ex.jpg" },
  { id: 5, title: "국제식당", description: "인천광역시 남구 용현동 194-19번지", img: "../../../public/ex.jpg" },
  { id: 4, title: "카페 하타가야", description: "인천광역시 미추홀구 용현동 195 28번지 2층", img: "../../../public/ex.jpg" },
  { id: 5, title: "국제식당", description: "인천광역시 남구 용현동 194-19번지", img: "../../../public/ex.jpg" },
  // { id: 6, title: "카페 하타가야", description: "인천광역시 미추홀구 용현동 195 28번지 2층", img: "../../../public/ex.jpg" },
  // ... 나머지 장소들 ...
];

Modal.setAppElement('#root'); 
export default function Like(){
  const [likedPlaces, setLikedPlaces] = useState(tempData);
  const [recoPlaces, setRecoPlaces]=useState(tempData);
  const el=useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen]=useState(false);
  const [modalContent, setModalContent]=useState<ItemDetail | null>(null);
  
  const openModalWithContent=(content:ItemDetail)=>{
    setModalContent(content);
    setModalIsOpen(true);
  };
  const renderModalContent = () => {
    if (!modalContent) return null;
    return (
      <div>
        <img src={modalContent.img}/>
        <h2>{modalContent.title}</h2>
        <p>{modalContent.description}</p>
      </div>
    );
  };
   // 좋아요 누른 장소 목록을 렌더링
   const renderLikedPlaces = () => {
    return likedPlaces.map(place => (
      <Onediv key={place.id} onClick={() => openModalWithContent(place)}>
        <img src={place.img}/>
        <div>
          <h3>{place.title}</h3>
          <p>{place.description}</p>
        </div>
      </Onediv>
    ));
  };
  const renderRecoPlaces=() => {
    return recoPlaces.map(place => (
      <OneRecoDiv key={place.id} onClick={() => openModalWithContent(place)}>
        <img src={place.img}/>
        <div>
          <h3>{place.title}</h3>
          <p>{place.description}</p>
        </div>
      </OneRecoDiv>
    ));
  };
  
  // const openModal = (e:React.TouchEvent<HTMLDivElement>) => {
  //   e.stopPropagation(); // 이벤트 버블링 방지
  //   setModalIsOpen(true);
  // };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const handleCloseModal = (e:TouchEvent) => {
      if (el.current && !el.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (modalIsOpen) {
        // 데스크톱 환경: 마우스 클릭 감지
      document.addEventListener('touchstart', handleCloseModal); 
    }
    return () => {
      document.removeEventListener('touchstart', handleCloseModal); 
    };
  }, [modalIsOpen]);
  return (
    <Wrapper>
      <Upper>
        <Info>
          <Name>이민정</Name>&nbsp;
          <span>님의 "To Go List"</span>
        </Info>
        <Order>
          <button>카테고리별</button>
          <button>등록순</button>
        </Order>
      </Upper>
      <Lower>
        <Category>
          <div>2023년 12월 13일</div>
          <Content >
          {renderLikedPlaces()}
          </Content>
            <StyledModal isOpen={modalIsOpen} onRequestClose={closeModal}>
              {renderModalContent()}
            </StyledModal>
        </Category>
      </Lower>
      <Reco>
        <Category>
          <div>
          <span>✅</span>&nbsp;
          <Name>이민정</Name>&nbsp;
          <span>님이 좋아할 만한 장소</span>
          </div>
          </Category>
        <RecoContent>
          {renderRecoPlaces()}
        </RecoContent> 
        </Reco>
    </Wrapper>
  )
}