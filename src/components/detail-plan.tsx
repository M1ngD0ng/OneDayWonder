import { styled } from "styled-components";
import PlanPlace from "./plan-place";

const Wrapper=styled.div`
  width: 90%;
`;

export default function DetailPlan(){
  return(
    <Wrapper> 
      <PlanPlace/>
      <PlanPlace/>
      <PlanPlace/>
      </Wrapper>
  );
};