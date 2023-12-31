import '@picocss/pico';
import { useEffect } from 'react';
import styled from 'styled-components';

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
    font-size: 35px;
    font-weight: bolder;
    text-align: center;
    margin-top: 5%;
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
    useEffect(() => {
        const loadGoogleMapsScript = () => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=%REACT_APP_MAPS_API_KEY%&libraries=places`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = initMap;
        };
        const initMap = () => {
            const myLatLng = { lat: 37.5665, lng: 126.978 };
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: myLatLng,
                zoom: 17,
            });
            new google.maps.Marker({
                position: myLatLng,
                map,
                title: "Hello World!",
              });
        };
        loadGoogleMapsScript();
    }, []);
    return(
        <Wrapper>
            <Img src="https://mblogthumb-phinf.pstatic.net/MjAyMzA4MjBfMjYx/MDAxNjkyNTI4ODcxNjQ0.JLR97VZegP4ErIJ54F8Qq2Il-j8aCxTHNIkfWG8T1kAg.ZETaQLIGnOVG3iBX5XyHGRNZg7oBjdyQfaiCb3-8VY8g.JPEG.bl85219/IMG%EF%BC%BF20230820%EF%BC%BF173828.jpg?type=w800" />
            <H1> 인천대공원 </H1>
            <ReviewDiv>
                <ReviewP> 주차장이 넓어요 </ReviewP>
                <ReviewP> 맛집이 있어요 </ReviewP>
                <ReviewP> 너무 복잡해요 </ReviewP>
                <ReviewP> 여러 가구를 볼 수 있어요 </ReviewP>
                <ReviewP> 사람이 너무 많아요 </ReviewP>
            </ReviewDiv>
            <TagDiv>
                <TagA href='#'> #광명 </TagA>
                <TagA href='#'> #쇼핑 </TagA>
                <TagA href='#'> #맛집 </TagA>
                <TagA href='#'> #핫플 </TagA>
            </TagDiv>
            <H3> 위치 : 경기도 광명시 일직동 </H3>
            <MapDiv id="map"></MapDiv>
        </Wrapper>
    );
}