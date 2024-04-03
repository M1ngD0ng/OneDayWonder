import '@picocss/pico';
import React, { useEffect, useState } from "react";
import TodaysPlan from "../components/todaysplan";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Unsubscribe } from "firebase/auth";
import { Grid, H1, HotFigure, HotImg, HotSmall, HotSpot, ImgDiv, NoPlan, Search, SearchBtn, SearchInput, Small, TextDiv, Today, TodayBtn, Wrapper } from '../components/style/style-home';

export interface IPlace {
  id: string;
  address: string;
  category: string;
  hash_tag: string[];
  img: string;
  liked: number;
  picked: number;
  place_name: string;
  rating: number;
  reg: string;
  reviews: string[];
}
export default function Home(){
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isTodays, setTodays]=useState(true);
  const [topThreeData, setTopThreeData] = useState<IPlace[]>([]);
  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchValue.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchValue)}`);
    }
  };
  const onPlanClick = async () => {
    try {
      navigate("/myplan");
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTopThreeData = async () => {
      const q = query(
        collection(db, 'place'),
        where('rating','!=','N/A'),
        orderBy('rating','desc'),
        limit(3)
      );
      unsubscribe = await onSnapshot(q, (snapshot) => {
        const qdata = snapshot.docs.map((doc) => {
          const { address, category, hash_tag, img, liked, picked, place_name, rating, reg, reviews} = doc.data();
          return {
            address,
            category,
            hash_tag,
            img,
            liked,
            picked,
            place_name,
            rating,
            reg,
            reviews,
            id: doc.id,
          };
        });
        setTopThreeData(qdata);
      });
  };
  fetchTopThreeData();
  return () => {
    unsubscribe && unsubscribe();
  };
},[]);
  return (
    <Wrapper>
      <H1> One Day Wonder </H1>
      <Grid className="grid">
        <Search onSubmit={onSearchSubmit}>
          <SearchInput type="text" placeholder="가고 싶은 지역/장소를 검색하세요" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <SearchBtn type="submit">
            <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </SearchBtn>
        </Search>
        <Today>
          <Small> 오늘의 기록 </Small>
          {isTodays? <NoPlan> 오늘의 기록이 없습니다 </NoPlan>:<TodaysPlan/>}
          <TodayBtn onClick={onPlanClick}> 기록 추가하기 </TodayBtn>
        </Today>
        <HotSpot>
          <HotSmall> 요즘 핫한 Spot 🔥 </HotSmall>
          <HotFigure>
            {topThreeData.map((topdata) => (
              <ImgDiv key={topdata.id}>
              <Link to={`/place/${topdata.id}`}>
                <HotImg src={topdata.img} />
                <TextDiv> {topdata.place_name} </TextDiv>
              </Link>
            </ImgDiv>
            ))}
          </HotFigure>
        </HotSpot>
      </Grid>
    </Wrapper>
  )
}