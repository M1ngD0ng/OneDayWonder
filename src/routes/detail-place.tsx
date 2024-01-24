import '@picocss/pico';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPlace } from './home';
import { Timestamp, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { H1, H3, Img, MapDiv, ReviewDiv, ReviewP, TagA, TagDiv, Wrapper } from '../components/style/style-detailPlace';
import firebase from 'firebase/compat/app';
export interface ILikedItem {
    liked_id: string;
    likedAt: firebase.firestore.Timestamp;
}
const addToLikedArray = async (userId: string, itemId: string) => {
    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const likedArray = userDoc.data()?.liked || [];
            const updateLikedArray = [
                ...likedArray,
                {
                    liked_id: itemId,
                    likedAt: Timestamp.now(),
                },
            ];
            await updateDoc(userDocRef, { liked: updateLikedArray });
        }
    } catch (e) {
        console.error(e);
    }
};
export default function Place() {
    const { id } = useParams();
    const [placeData, setPlaceData] = useState<IPlace | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const user = auth.currentUser;
    if (!user) return;
    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userSnapshot = await getDoc(userDocRef);
                if (!userSnapshot.exists()) {
                    await setDoc(userDocRef, { liked: [] });
                }
                const likedArray = userSnapshot.data()?.liked || [];
                const checkLiked = likedArray.includes(id);
                setIsLiked(checkLiked);
            } catch (e) {
                console.error(e);
            }
        };
        checkIfLiked();
    }, [id, user]);
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
    const onLikeClick = async () => {
        try {
            if(!user || !id) return;
            const userDoc = await getDoc(doc(db,'users',user.uid));
            const likedArray: ILikedItem[] = userDoc.data()?.liked || [];
            if (isLiked) {
                const updateLikedArray = likedArray.filter((likedItem) => likedItem.liked_id !== id);
                await updateDoc(doc(db, 'users', user.uid), { liked: updateLikedArray });
            } else {
                await addToLikedArray(user.uid, id);
            }
            setIsLiked((prevIsLiked) => !prevIsLiked);
        } catch (e) {
            console.error(e);
        }
    };
    return(
        <Wrapper>
            <Img src={placeData?.photo_url} />
            <H1> 
                <span id='name'>{placeData?.name}</span>
                <span id='like' onClick={onLikeClick}>{isLiked ? '❤️' : '♡'}</span>
            </H1>
            <ReviewDiv>
                <ReviewP> 별점 : {placeData?.rating} </ReviewP>
                <ReviewP> 전화번호 : {placeData?.phone_number ?? "None"} </ReviewP>
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