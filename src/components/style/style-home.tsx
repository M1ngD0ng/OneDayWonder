import styled from "styled-components";

export const Wrapper=styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  background-color: #9B4DE3;
  position: fixed;
  overflow-y: auto;
 `;
export const H1 = styled.h1`
  color: white;
  margin-top: 10%;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10%;
`;
export const Grid = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10%;
`;
export const Search = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 50px;
  box-shadow: 1px 2px 3px purple;
`;
export const SearchInput = styled.input`
  border: 0px;
  background-color: none;
  border-radius: 4px;
  float: left;
  width: 70%;
  margin: 0px !important;
  height: 30px;
  padding-left: 30px !important;
  :focus {
    outline: none;
  }
`;
export const SearchBtn = styled.button`
  border: 0px;
  outline: none;
  float: right;
  width: 30%;
  background-color: transparent;
  margin: 0px;
  :focus{
    outline: none;
  }
  svg {
    color: #8A2BE2;
    height: 30px;
  }
`;
export const Today = styled.div`
  background-color: white;
  border-radius: 30px;
  margin-top: 10%;
  margin-left: 5%;
  margin-right: 5%;
  text-align: center;
  padding-top: 3%;
  padding-bottom: 3%;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 2px 3px purple;
`;
export const Small = styled.small`
  font-size: 25px;
  color: #8A2BE2;
  font-weight: 600;
`;
export const TodayBtn = styled.button`
  width: 40%;
  margin-top: 5%;
  margin-left: 30%;
  margin-right: 30%;
  background-color: #9B4DE3;
  box-shadow: 1px 2px 3px lightgrey;
  color: white;
  border: 0px;
  border-radius: 10px;
`;
export const NoPlan = styled.small`
  margin-top: 5%;
  color: #8A2BE2;
  font-weight: 400;
`;
export const HotSpot = styled.div`
  margin-top: 10%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 10%;
  display: flex;
  flex-direction: column;
`;
export const HotSmall = styled.small`
  font-size: 25px;
  color: white;
  font-weight: 600;
`;
export const HotFigure = styled.figure`
  margin-top: 3%;
  width: 100%;
  height: 300px;
  display: inline;
  overflow-x: scroll;
  white-space: nowrap;
`;
export const ImgDiv = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 5%;
  border-radius: 10px;
  box-shadow: 1px 2px 3px purple;
`;
export const HotImg = styled.img`
  width: 250px;
  height: 250px;
`;
export const TextDiv = styled.div`
  position: absolute;
  background-color: none;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 25px;
  font-weight: 500;
`;