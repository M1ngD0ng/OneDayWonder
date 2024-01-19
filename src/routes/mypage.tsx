import '@picocss/pico';
import { useState } from 'react';
import { auth } from '../firebase';
import MyPageEdit from '../components/mypage-edit';
import { useNavigate } from 'react-router-dom';
import { Button, Div, EditDiv, H1, H6, ImgDiv, InfoDiv, InfoP, MyDiv, PhotoImg, TagA, TagDiv } from '../components/style/style-mypage';

export default function MyPage(){
  const [showEdit, setshowEdit] = useState(false);
  const user = auth.currentUser;
  const [isPhotos, setPhotos]=useState(user?.photoURL);
  const onEditClick = async () => {
    setshowEdit(true);
  };
  const navigate = useNavigate();
  const onLogOut = async () => {
    const ok = confirm("로그아웃 하시겠습니까? :( ");
    if (ok) {
      await auth.signOut();
      navigate("/login");
    }
  };
  return (

    <Div>
      {showEdit ? <MyPageEdit /> :
      <>
      <H1> My Page</H1>
      <MyDiv>
        <ImgDiv>
          {isPhotos ? 
            <PhotoImg src={isPhotos} />: 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          }
        </ImgDiv>
        <InfoDiv>
          <H6> 닉네임 </H6>
          <InfoP> {user?.displayName ?? "익명"} </InfoP>
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
          <Button onClick={onEditClick} > 정보 수정하기 </Button>
          <Button onClick={onLogOut} > 로그아웃하기 </Button>
        </EditDiv>
      </MyDiv>
      </>
      }
    </Div>
  )
}