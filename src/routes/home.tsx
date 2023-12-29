import { styled } from "styled-components";
import '@picocss/pico';

const Wrapper=styled.div`
  height: 100vh;
  flex-direction: column;
  display: flex;
  background-color: #ff9500;
 `;
const H1 = styled.h1`
  color: white;
  margin-top: 5%;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 5%;
`;
const Grid = styled.div`
  margin-left: 5%;
  margin-right: 5%;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
  background-color: white;
  border-radius: 50px;
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
const Today = styled.div`
  background-color: white;
  border-radius: 30px;
`;

export default function Home(){
  return (
    <Wrapper>
      <H1> One Day Wonder </H1>
      <Grid className="grid">
        <Search>
          <SearchInput type="text" placeholder="가고 싶은 지역/장소를 검색하세요" />
          <SearchBtn type="submit">
            <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </SearchBtn>
        </Search>
        <Today>
          
        </Today>
      </Grid>
    </Wrapper>
  )
}