import styled from "styled-components"
import { auth } from "../firebase";
import LikedList from "../components/like/liked-list";
import RecoList from "../components/like/reco-list";


const Wrapper=styled.div` //최상단 태그 , 배경색 설정
  height: 100%;
  width: 100%;
  position: fixed;
  flex-direction: column;
  display: flex;
  overflow-y: auto;
  background-image: linear-gradient(to bottom, #8A2BE2, white 45%);
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
export const Name=styled.span`
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

export const Category=styled.div`
  div{
    margin-left: 3.6%;
    float: left;
    margin-bottom: 3%;
    font-weight: lighter;
  }
`;


const Reco=styled.div`
  flex-direction: column;
  display: flex;
  position: relative;
  width : 90%;
  padding: 0 5%;
  margin-bottom: 25%;
  ::-webkit-scrollbar {
      display:none;
    }
  
`;

export default function Like(){ 
  const user=auth.currentUser;
  
  return (
    <Wrapper>
      <Upper>
        <Info>
          <Name>{user?.displayName ?? "사용자"}</Name>&nbsp;
          <span>님의 "To Go List"</span>
        </Info>
        <Order>
          <button>카테고리별</button>
          <button>등록순</button>
        </Order>
      </Upper>
      <Lower>
        <LikedList />
      </Lower> 
      <Reco>
        <RecoList />
        </Reco>
    </Wrapper>
  )
}