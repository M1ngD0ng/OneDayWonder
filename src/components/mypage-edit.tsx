import '@picocss/pico';
import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MyPage from "../routes/mypage";
import { Button, Div, EditDiv, H1, H6, ImgDiv, InfoDiv, InfoP, PhotoImg, TagA, TagDiv } from './style/style-mypage';

const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 5px 5px lightgray;
  margin-bottom: 10%;
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
        color: #8A2BE2;
    }
`;
const ImgInput = styled.input`
    display: none;
`;
const NameLabel = styled.label`
  margin-top: 5%;
  margin-left: 5%;
  color: #8A2BE2;
  font-size: 25px;
  font-weight: 500;
  float: left;
`;
const NameInput = styled.input`
  width: 90% !important;
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 50px;
  font-size: 25px;
`;

export default function MyPageEdit() {
    const nagivate = useNavigate();
    const user = auth.currentUser;
    const [showEdit, setshowEdit] = useState(false);
    const [isPhotos,setIsPhotos] = useState(user?.photoURL);
    const [photo, setPhoto] = useState("");
    const [nickname, setNickname] = useState(user?.displayName);
    const [error, setError] = useState("");
    const onPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!user) return;
      if (files && files.length === 1) {
        const file = files[0];
        const locationRef = ref(storage, `profilePhotos/${user?.uid}`);
        const result = await uploadBytes(locationRef, file);
        const profileURL = await getDownloadURL(result.ref);
        setPhoto(profileURL);
      }
    };
    const onNameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
      setNickname(value);
    };
    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      if (!user) return;
      if (photo === user.photoURL || nickname === user.displayName) {
        setshowEdit(true);
        return;
      }
      try {
        if (photo !== user.photoURL) {
          await updateProfile(user, {
            photoURL: photo,
          });
        }
        if (nickname !== user.displayName) {
          await updateProfile(user, {
            displayName: nickname,
          });
        }
        setshowEdit(true);
      } catch (e) {
        console.log(e);
      }
    };
    return (  
      <Div>
        {showEdit ? <MyPage /> :
        <>
        <H1> My Page</H1>
        <MyForm onSubmit={onSubmit}>
          <ImgDiv>
            <ImgLabel htmlFor='photo'>
                {isPhotos ? 
                <PhotoImg src={isPhotos} />: 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                }
            </ImgLabel>
            <ImgInput onChange={onPhotoChange} id='photo' name='photo' type='file' accept='image/*' />
          </ImgDiv>
          <InfoDiv>
            <NameLabel htmlFor='nickname'> 닉네임 </NameLabel>
            <NameInput onChange={onNameChange}type='text' id='nickname' name='nickname' placeholder={user?.displayName ?? "익명"} />
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
            <Button type='submit' > 제출하기 </Button>
          </EditDiv>
        </MyForm>
        </>
        }
      </Div>
  )
}