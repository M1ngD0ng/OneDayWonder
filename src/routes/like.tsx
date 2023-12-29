import styled from "styled-components"
import Modal from 'react-modal';
import { useEffect, useRef, useState } from "react";
 
const Wrapper=styled.div` //최상단 태그 , 배경색 설정
    height: 100vh;
    flex-direction: column;
    display: flex;
   background-image: linear-gradient(to bottom, #ff9500, white 45%);
 `;

const Upper=styled.div`
  justify-content: center;
`
const Lower=styled.div`
  ::-webkit-scrollbar {
      display:none;
    }
`
const Info=styled.div`
  margin-top: 20%;
  text-align: center;
  font-size: 25px;
`;
const Name=styled.span`
  font-weight: bold;
`;

const Order=styled.div`
  margin-top: 10%;
  button{
    color: black;
    font-size: 16px;
    width: max-content;
    float: right;
    margin-left: 1%;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: inherit;
  }
`;

const OrderByDay=styled.div`
  div{
    margin-left: 5%;
    float: left;
    margin-bottom: 3%;
  }
`;

const Content=styled.div`
  box-shadow: 1px solid;
  img {
    width: 20%;
    border-radius: 15%;
  }
`;

const StyledModal =styled(Modal)`
  position: absolute;
  top: auto;
  left: auto; 
  height: 50%;
  width: 75%;
`
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent; // 배경을 투명하게 설정
`;
Modal.setAppElement('#root'); 
export default function Like(){
  const el=useRef<HTMLDivElement>(null);
  const [modalIsOpen, setModalIsOpen]=useState(false);

  const openModal = (e:React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setModalIsOpen(true);
  };

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
        <OrderByDay>
          <div>2023년 12월 13일</div>
          <Content onTouchStart={openModal}>
            <img src="../../../public/ex.jpg" />
           <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <div>짝노시발아</div>
           </Modal>
          </Content>

        </OrderByDay>
      </Lower>
    </Wrapper>
  )
}