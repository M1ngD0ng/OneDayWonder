import { useState } from "react";
import { auth } from "../../firebase";
import { styled } from "styled-components";
import { Category, Name } from "../../routes/like";

const RecoContent=styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: auto;
  width: 100%;
  height: 100%; 
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
  height: 80%; // 높이 설정
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
export default function RecoList(){
  const [recoPlaces, setRecoPlaces]=useState(tempData);
  
  const user=auth.currentUser;

  const renderRecoPlaces=() => {
    return recoPlaces.map(place => (
      <OneRecoDiv key={place.id} >
        <img src={place.img}/>
        <div>
          <h3>{place.title}</h3>
          <p>{place.description}</p>
        </div>
      </OneRecoDiv>
    ));
  };
  return(
    <>
    <Category>
          <div>
          <span>✅</span>&nbsp;
          <Name>{user?.displayName ?? "사용자"}</Name>&nbsp;
          <span>님이 좋아할 만한 장소</span>
          </div>
          </Category>
        <RecoContent>
          {renderRecoPlaces()}
        </RecoContent> 
        </>
  )
}