import styled from "styled-components";

export const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  position: fixed;
  overflow-y: auto;
`;
export const Img = styled.img`
    width: 100%;
    height: 30%;
`;
export const H1 = styled.h1`
    color: #8A2BE2;
    text-align: center;
    margin-top: 5%;
    margin-left: 8%;
    margin-right: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    #name {
        font-size: 35px;
        font-weight: bolder;
    }
    #like {
        font-size: 20px;
    }
`;
export const ReviewDiv = styled.div`
    background-color: #9B4DE3;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 5%;
    border-radius: 30px;
    padding: 3%;
    box-shadow: 0px 5px 5px lightgray;
`;
export const ReviewP = styled.p`
    margin-top: 2%;
    padding-left: 5%;
    color: white;
    font-size: 25px;
    font-weight: 500;
`;
export const TagDiv = styled.div`
    margin-top: 5%;
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
  padding: 3%;
  margin-left: 2%;
  margin-right: 2%;
  text-align: center;
  text-decoration: none;
  font-size: 20px;
  box-shadow: 0px 5px 5px lightgray;
`;
export const H3 = styled.h3`
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
    color: #8A2BE2;
    font-size: 15px;
`;
export const MapDiv = styled.div`
    margin: 5%;
    width: 90%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 5%;
`;