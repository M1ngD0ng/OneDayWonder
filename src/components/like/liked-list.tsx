import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { Category } from "../../routes/like";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Unsubscribe } from "firebase/auth";
import { collection, doc, getDoc, query, where } from "firebase/firestore";

export interface IPlace {
  id: string;
  address: string;
  name: string;
  photo_url: string;
}

const Content = styled.div`
  box-shadow: 1px solid;
  flex-direction: column;
  width: 95%; 
  display: flex;  
  div{
    margin: 10px; 
  }
`;
const Onediv = styled.div`
  border: 1px;
  flex-direction: row;
  box-shadow: 0px 5px 5px lightgrey;
  border-radius: 15px;
  width: 90%; 
  height: fit-content;
  padding: 4%; 
  background-color: white;
  /* img {
    width: 20%;
    height: 100%; // 높이를 요소의 높이만큼 지정합니다.
    border-radius: 10px;
    float: left;
    object-fit: cover; // 이미지를 요소의 크기에 맞춰서 크롭합니다.
  } */
  .image-container {
    width: 80px;
    height: 80px;
    overflow: hidden; // 컨테이너 밖으로 나가는 이미지 숨기기
    border-radius: 10px; // 필요하다면 둥근 모서리 설정
  }
    
  .image-container img {
    width: auto; // 원본 비율 유지를 위해 auto 설정
    min-width: 100%; // 최소 너비를 컨테이너와 같게 설정
    height: 100%; // 높이를 컨테이너와 같게 설정
    object-fit: cover; // 이미지가 컨테이너를 넘칠 경우 잘라냄
    object-position: center; // 이미지의 가로 중앙이 항상 보이도록 설정
  }

  .content-container{
    width: 60%;
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


export default function LikedList() {
  const navigate=useNavigate();
  const [likedPlaces, setLikedPlaces] = useState<IPlace[]>([]);
  const user = auth.currentUser;

  const onPlaceClick=(pid)=>{
    navigate(`/place/${pid}`);
  }

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchLikedData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          if (userData.liked) {
            // setLikedPlaces가 함수로 호출되어야 합니다.
            const placesPromises=userData.liked.map(async (placeId) =>{
              const placeRef=doc(db,"sample",placeId);
              const placeSnap=await getDoc(placeRef);
              if (placeSnap.exists()){
                return { id: placeId, address: placeSnap.data().address, name: placeSnap.data().name, photo_url: placeSnap.data().photo_url };
              } else{
                return null;
              }
            });

            const places= await Promise.all(placesPromises);
            setLikedPlaces(places.filter((place)=>place!==null)); // 이 부분은 받아온 데이터에 맞게 매핑해야합니다.
          } else{
             // 좋아요한 항목이 없는 상태로, 나중에 처리 필요
             return;
          }
        } else {
          // 좋아요한 항목이 없는 상태로, 나중에 처리 필요
          return;
        }
      }
    };
  
    fetchLikedData();
  
    // unsubscribe를 설정하는 부분이 있으면 여기에 추가하세요.
  
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []); // user가 변경될 때만 이 useEffect를 실행합니다.

  // 좋아요 누른 장소 목록을 렌더링
  // <img src={place.img}/> 잠시 삭제함
  const renderLikedPlaces = () => {
    return likedPlaces.map(place => (
      <Onediv key={place.id} onClick={()=>onPlaceClick(place.id)}>
        <div className="image-container">
          <img src={place.photo_url} />
        </div>
        <div className="content-container">
          <h3>{place.name}</h3>
          <p>{place.address}</p>
        </div>
      </Onediv>
    ));
  };

  return (
    <>
      <Category>
        <div>2023년 12월 13일</div>
        <Content >
          {renderLikedPlaces()}
        </Content>
      </Category>
    </>

  )
}