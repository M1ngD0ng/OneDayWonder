import '@picocss/pico';
import styled from 'styled-components';

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
const myDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0px 5px 5px lightgray;
`;

export default function MyPage(){
  return (
    <Div>
      <H1> My Page</H1>

    </Div>
  )
}