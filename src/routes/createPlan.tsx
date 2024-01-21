import { styled } from "styled-components";
import Question from "../components/question";
import { auth } from "../firebase";

const Wrapper = styled.div` //최상단 태그 , 배경색 설정
  height: 100%;
  width: 100%;
  position: fixed;
  flex-direction: column;
  display: flex;
  overflow-y: auto;
  background-image: linear-gradient(to bottom, #8A2BE2, white 45%); 
 `;
const Upper = styled.div`   
  width: 100%;
  margin-bottom: 7%;
`;

const Lower = styled.div`

  position: relative ;
  overflow-y: scroll;
  padding-top: 5%;
  margin-bottom: 25%;
  ::-webkit-scrollbar {
      display:none;
    }
`

const Info = styled.div`
  font-size: 25px; 
  flex-direction: column;
  display: flex;
  align-items: center;
  margin-top: 20%;
  p{
    color: white;
    padding-bottom: 2%; 
    span{
      font-weight: lighter;
    }
  }
`;
const Name = styled.span`
  font-weight: bold !important; 
`;

export default function CreatePlan() {
  const user = auth.currentUser;
  return (
    <Wrapper>
      <Upper>
        <Info>
          <p><Name>{user?.displayName ?? "사용자"}</Name>&nbsp;
            <span>님</span></p>
          <p><span>어떤 하루를 원하시나요?</span></p>
        </Info>
      </Upper>
      <Lower>
        <Question></Question>
      </Lower>
    </Wrapper>
  );
};