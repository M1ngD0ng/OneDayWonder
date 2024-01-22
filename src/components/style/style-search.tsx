import styled from "styled-components";

export const Wrapper=styled.div`
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    background-color: #8A2BE2;
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
export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 50px;
  margin-bottom: 5%;
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
    color: #ff9500;
    height: 30px;
  }
`;
export const ResultDiv = styled.div`
    display: inline;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 20%;
    overflow-y: scroll;
    height: 600px;
`;
export const ItemDiv = styled.div`
  box-shadow: 0px 5px 5px lightgrey;
  border-radius: 15px;
  width: 90%; // 너비 설정
  height: 100px; // 높이 설정
  padding: 4%; // 패딩 설정
  background-color: white; // 배경색 설정
  margin: 10px; // 마진 설정
  display: inline-block;
  position: relative;
`;
export const ItemImg = styled.img`
    width: 30%;
    height: 100%;
    border-radius: 10px;
    float: left;
    margin-right: 5%;
`;
export const InfoDiv = styled.div`
    width: 65%;
    float: right;
`;
export const NameH3 = styled.h3`
    font-weight: bold;
    padding-bottom: 1%;
`;
export const AddP = styled.p`
    font-size: smaller;
    flex: 1;
    color: black;
    padding-bottom: 5%;
`;
export const TagP = styled.p`
    font-size: smaller;
    flex: 1;
    color: gray;
`;
