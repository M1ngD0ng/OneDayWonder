import '@picocss/pico';
import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';

const Div = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  background-image: linear-gradient(to bottom, #ff9500, white 45%);
  position: fixed;
  overflow-y: auto;
`;
const H1 = styled.h1`
  color: white;
  margin-top: 10%;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10%;
`;
const MyDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 5px 5px lightgray;
  margin-bottom: 10%;
`;
const ImgDiv = styled.div`
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImgLabel = styled.label`
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    svg {
        width: 100px;
        height: 100px;
        color: #ff9500;
    }
`;
export const PhotoImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
const ImgInput = styled.input`
    display: none;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;
const H6 = styled.h6`
  margin-top: 5%;
  margin-left: 5%;
  color: #ff9500;
  font-size: 25px;
  font-weight: 500;
  float: left;
`;
const InfoP = styled.p`
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  padding-left: 6%;
  padding-top: 3%;
  padding-bottom: 3%;
  background-color: lightgray;
  border-radius: 50px;
  font-size: 25px;
`;
const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
const TagA = styled.a`
  background-color: #FFC067;
  color: white;
  width: 20%;
  border-radius: 10px;
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 3%;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 5px 5px lightgray;
`;
const EditDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
const Button = styled.button`
    background-color: #ff9500;
    border-color: #ff9500;
    border-radius: 20px;
    width: 40%;
`;

export default function MyPageEdit() {  
    const [showEdit, setshowEdit] = useState(false);
    const user = auth.currentUser;
    const [isPhotos, setPhotos]=useState(user?.photoURL);
    const onEditClick = async () => {
      setshowEdit(true);
    };
    return (  
      <Div>
        <H1> My Page</H1>
        <MyDiv>
          <ImgDiv>
            <ImgLabel>
                {isPhotos ? 
                <PhotoImg src={isPhotos} />: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                }
            </ImgLabel>
            <ImgInput/>
          </ImgDiv>
          <InfoDiv>
            <H6> 닉네임 </H6>
            <InfoP> {user?.displayName} </InfoP>
            <H6> 이메일 </H6>
            <InfoP> {user?.email} </InfoP>
          </InfoDiv>
          <H6> 내가 원하는 장소 </H6>
          <TagDiv>
            <TagA href='#'> #쇼핑 </TagA>
            <TagA href='#'> #카페 </TagA>
            <TagA href='#'> #전시 </TagA>
            <TagA href='#'> #팝업스토어 </TagA>
            <TagA href='#'> #맛집 </TagA>
            <TagA href='#'> #액션 </TagA>
          </TagDiv>
          <EditDiv>
            <Button onClick={onEditClick} > 제출하기 </Button>
          </EditDiv>
        </MyDiv>
      </Div>
  )
}