import '@picocss/pico';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { IPlace } from './home';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90%;
  position: fixed;
  overflow-y: auto;
`;
const Img = styled.img`
    width: 100%;
    height: 30%;
`;
const H1 = styled.h1`
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
const ReviewDiv = styled.div`
    background-color: #9B4DE3;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 5%;
    border-radius: 30px;
    padding: 3%;
    box-shadow: 0px 5px 5px lightgray;
`;
const ReviewP = styled.p`
    margin-top: 2%;
    padding-left: 5%;
    color: white;
    font-size: 25px;
    font-weight: 500;
`;
const TagDiv = styled.div`
    margin-top: 5%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;
const TagA = styled.a`
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
const H3 = styled.h3`
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
    color: #8A2BE2;
    font-size: 15px;
`;
const MapDiv = styled.div`
    margin: 5%;
    width: 90%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 5%;
`;
export default function Place() {
    const { id } = useParams();
    const [placeData, setPlaceData] = useState<IPlace | null>(null);
    useEffect(() => {
        const fetchPlaceData = async () => {
            try {
                if (!id) return;
                const docRef = doc(db, 'sample', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPlaceData(data as IPlace);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchPlaceData();
    }, [id]);
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const key = import.meta.env.VITE_APP_MAPS_API_KEY;
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = initMap;
        };
        const initMap = () => {
            if (!placeData) return;
            const myLatLng = { lat: placeData.lat, lng: placeData.lng };
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 17,
            });
            new google.maps.Marker({
                position: myLatLng,
                map,
                title: placeData.name,
              });
        };
        loadGoogleMapsScript();
    }, [placeData]);
    return(
        <Wrapper>
            <Img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800" />
            <H1> 
                <span id='name'>{placeData?.name}</span>
                <span id='like'> ♡ : {placeData?.liked}</span>
            </H1>
            <ReviewDiv>
                <ReviewP> 별점 : {placeData?.rating} </ReviewP>
                <ReviewP> 전화번호 : {placeData?.phoneNumber} </ReviewP>
                <ReviewP> 유형 : {placeData?.types} </ReviewP>
            </ReviewDiv>
            <TagDiv>
                <TagA href='#'> #아직 </TagA>
                <TagA href='#'> #구현 </TagA>
                <TagA href='#'> #못함 </TagA>
            </TagDiv>
            <H3> 위치 : {placeData?.address} </H3>
            <MapDiv id="map"></MapDiv>
        </Wrapper>
    );
}