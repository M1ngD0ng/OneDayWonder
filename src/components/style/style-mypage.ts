import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  background-image: linear-gradient(to bottom, #8A2BE2, white 45%);
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
export const MyDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0px 5px 5px lightgray;
  margin-bottom: 10%;
`;
export const ImgDiv = styled.div`
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100px;
    height: 100px;
    color: #8A2BE2;
  }
`;
export const PhotoImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;
export const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;
export const H6 = styled.h6`
  margin-top: 5%;
  margin-left: 5%;
  color: #8A2BE2;
  font-size: 25px;
  font-weight: 500;
  float: left;
`;
export const InfoP = styled.p`
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  padding-left: 6%;
  padding-top: 3%;
  padding-bottom: 3%;
  background-color: lightgray;
  box-shadow: 1px 2px 3px grey;
  border-radius: 50px;
  font-size: 25px;
`;
export const TagDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
export const TagA = styled.a`
  background-color: #BB91E3;
  color: white;
  width: 20%;
  border-radius: 10px;
  margin-top: 3%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 3%;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 2px 5px lightgrey;
`;
export const EditDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;
export const Button = styled.button`
    background-color: #9B4DE3;
    box-shadow: 1px 2px 3px grey;
    border-color: #9B4DE3;
    border-radius: 20px;
    width: 40%;
`;