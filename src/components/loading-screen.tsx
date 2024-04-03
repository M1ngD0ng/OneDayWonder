import { styled } from "styled-components"

const Wrapper=styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #AB6FE3;
`;

const Text=styled.span`
  font-size: 24px;
  color: white;
  font-weight: bold;
`;
export default function LoadingScreen(){
  return <Wrapper><Text>Loading...</Text></Wrapper>
}