import styled from "styled-components"

 
 const Wrapper=styled.div`
    height: 100vh;
    flex-direction: column;
    display: flex;
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
  }
`;
export default function Like(){
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
        </OrderByDay>
      </Lower>
    </Wrapper>
  )
}