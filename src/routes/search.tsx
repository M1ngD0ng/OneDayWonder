import { styled } from "styled-components";
import '@picocss/pico';

const Wrapper=styled.div`
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    background-color: #8A2BE2;
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
const Grid = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10%;
`;
const SearchDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 50px;
  margin-bottom: 5%;
`;
const SearchInput = styled.input`
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
const SearchBtn = styled.button`
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
const ResultDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 5%;
    margin-right: 5%;
`;
const ItemDiv = styled.div`
  box-shadow: 0px 5px 5px lightgrey;
  border-radius: 15px;
  width: 90%; // 너비 설정
  height: 80%; // 높이 설정
  padding: 4%; // 패딩 설정
  background-color: white; // 배경색 설정
  margin: 10px; // 마진 설정
  display: flex; // flexbox 활성화
  flex-direction: row; // 행 방향으로 요소 배치
`;
const ItemImg = styled.img`
    width: 20%;
    border-radius: 10px;
    float: left;
    margin-right: 5%;
`;
const InfoDiv = styled.div`
    width: 70%;
`;
const NameH3 = styled.h3`
    font-weight: bold;
    padding-bottom: 1%;
    a {
        text-decoration: none;
        color: black;
        
    }
`;
const AddP = styled.p`
    font-size: smaller;
    flex: 1;
    padding-bottom: 5%;
`;
const TagP = styled.p`
    font-size: smaller;
    flex: 1;
    color: gray;
`;


export default function Search() {
    
    return(
        <Wrapper>
        <H1> One Day Wonder </H1>
        <Grid className="grid">
          <SearchDiv>
            <SearchInput type="text" placeholder="가고 싶은 지역/장소를 검색하세요" />
            <SearchBtn type="submit">
              <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </SearchBtn>
          </SearchDiv>
          <ResultDiv>
            <ItemDiv>
                <ItemImg src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800"/>
                <InfoDiv>
                    <NameH3> <a href="/place"> 인천대공원</a> </NameH3>
                    <AddP>인천광역시 </AddP>
                    <TagP>#조용한 #자연 #공원 </TagP>
                </InfoDiv>
            </ItemDiv>
            <ItemDiv>
                <ItemImg src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800"/>
                <InfoDiv>
                    <NameH3> <a href="/place"> 인천대공원</a> </NameH3>
                    <AddP>인천광역시 </AddP>
                    <TagP>#조용한 #자연 #공원 </TagP>
                </InfoDiv>
            </ItemDiv>
            <ItemDiv>
                <ItemImg src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800"/>
                <InfoDiv>
                    <NameH3> <a href="/place"> 인천대공원</a> </NameH3>
                    <AddP>인천광역시 </AddP>
                    <TagP>#조용한 #자연 #공원 </TagP>
                </InfoDiv>
            </ItemDiv>
            <ItemDiv>
                <ItemImg src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800"/>
                <InfoDiv>
                    <NameH3> <a href="/place"> 인천대공원</a> </NameH3>
                    <AddP>인천광역시 </AddP>
                    <TagP>#조용한 #자연 #공원 </TagP>
                </InfoDiv>
            </ItemDiv>
            <ItemDiv>
                <ItemImg src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800"/>
                <InfoDiv>
                    <NameH3> <a href="/place"> 인천대공원</a> </NameH3>
                    <AddP>인천광역시 </AddP>
                    <TagP>#조용한 #자연 #공원 </TagP>
                </InfoDiv>
            </ItemDiv>
          </ResultDiv>
        </Grid>
      </Wrapper>
    );
}