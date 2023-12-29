import { styled } from "styled-components";
import reset from "styled-reset";

const Wrapper=styled.div`
  height: 100vh;
    flex-direction: column;
    display: flex;
  background-color: #ff9500;
 `;

export default function Home(){
  return (
    <Wrapper>

    <div>home~</div>
    </Wrapper>
  )
}