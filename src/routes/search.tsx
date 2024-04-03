import '@picocss/pico';
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IPlace } from "./home";
import { AddP, Grid, H1, InfoDiv, ItemDiv, ItemImg, NameH3, ResultDiv, SearchBtn, SearchForm, SearchInput, TagP, Wrapper } from '../components/style/style-search';
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { IPlace } from "./home";
import { AddP, Grid, H1, InfoDiv, ItemDiv, ItemImg, NameH3, ResultDiv, SearchBtn, SearchForm, SearchInput, TagP, Wrapper } from '../components/style/style-search';

export default function Search() {
    const { value } = useParams();
    const navigate = useNavigate();
    const [searcValue, setSearchValue] = useState("");
    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searcValue.trim() !== "") {
        navigate(`/search/${encodeURIComponent(searcValue)}`);
      }
    };
    const [searchResults, setSearchResults] = useState<IPlace[]>([]);
    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const addressQuery = query(
            collection(db, 'sample'),
            where('address', 'array-contains', value),
          );
          const typesQuery = query(
            collection(db, 'sample'),
            where('types', 'array-contains', value),
          );
          const nameQuery = query(
            collection(db, 'sample'),
            where('name', '==', value)
          );
          const [addressSnapshot, typesSnapshot, nameSnapshot] = await Promise.all([
            getDocs(addressQuery),
            getDocs(typesQuery),
            getDocs(nameQuery),
          ]);
          const addressData = addressSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const typesData = typesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const nameData = nameSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const uniqueResults = [
            ...new Map([...addressData, ...typesData, ...nameData].map(item => [item.id, item])).values()
          ];
          const sortedResults = (uniqueResults as IPlace[]).sort((a,b) => b.rating - a.rating);
          setSearchResults(sortedResults);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSearchResults();
    }, [value]);
    const { value } = useParams();
    const navigate = useNavigate();
    const [searcValue, setSearchValue] = useState("");
    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (searcValue.trim() !== "") {
        navigate(`/search/${encodeURIComponent(searcValue)}`);
      }
    };
    const [searchResults, setSearchResults] = useState<IPlace[]>([]);
    useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const keywordsQuery = query(
            collection(db, 'sample'),
            where('keywords', 'array-contains', value),
          );
          const keywordsSnapshot = await getDocs(keywordsQuery);
          const keywordsData = keywordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const sortedResults = (keywordsData as IPlace[]).sort((a,b) => b.rating - a.rating);
          setSearchResults(sortedResults);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSearchResults();
    }, [value]);
    return(
        <Wrapper>
        <H1> One Day Wonder </H1>
        <Grid className="grid">
          <SearchForm onSubmit={onSearchSubmit}>
            <SearchInput type="text" placeholder={value} value={searcValue} onChange={(e) => setSearchValue(e.target.value)}/>
            <SearchBtn type="submit">
              <svg data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </SearchBtn>
          </SearchForm>
          <ResultDiv>
            {searchResults.map((result) => (
              <ItemDiv>
                <Link to={`/place/${result.id}`}>
                  <ItemImg src={result.photo_url}/>
                  <InfoDiv>
                    <NameH3>{result.name}</NameH3>
                    <AddP>{result.address}</AddP>
                    <TagP>{result.types}</TagP>
                  </InfoDiv>
                </Link>
              </ItemDiv>
            ))}
          </ResultDiv>
        </Grid>
      </Wrapper>
    );
}