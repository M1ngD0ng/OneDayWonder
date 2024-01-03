import { styled } from "styled-components";

const Dot=styled.div` 
  margin: 3% 0;
  text-align: center; 
`;

const Dot1=styled.p`
  font-size: larger;
  font-weight: 900; 
`;
const Dot2=styled.p`
  font-size: larger;
  font-weight: 700;
  padding-top: 3%;
`;
const Dot3=styled.p`
  font-size: larger;
  font-weight: 500;
  padding-top: 3%;
`;

export default function Dots(){
  return(
    <Dot>
      <Dot1>.</Dot1>
      <Dot2>.</Dot2>
      <Dot3>.</Dot3>
    </Dot>
  );
};