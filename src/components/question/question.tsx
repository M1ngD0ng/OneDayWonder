import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Dots from "../layout/dots";
import LocationSelection from "./location-selection";
import PeopleSelection from "./people-selection";
import DateSelection from "./date-selection";
import MoodSelection from "./mood-selection";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import MenuSelection from "./menu-selection";


const Wrapper = styled.div` 
  align-items: center;
  flex-direction: column;
  display: flex;
  overflow-y: visible;
`;
export const QuesBlock = styled.div`
  margin-top: 2%;
  padding: 7% 10%;  
  width: 90%;
  background-color: #9B4DE3; 

  box-shadow: 1px 2px 3px grey;
  border-radius: 20px;
  position: relative; 
  color: white;
  font-weight: lighter; 
 
  height: max-content;
  flex-direction: column;
  display: flex;
  text-align: left;
  font-size: medium;
`;

export const Ques = styled.div`
  text-align: center;
  font-size: large;
  font-weight: bolder;
  margin-bottom: 3%;
`;

export const Ans = styled.div`
  font-size: small;
  font-weight: bolder;
`;

const Alert=styled.div`
  margin-top: 6%;
  font-weight: bold;
`;

const Button =styled.button`
  margin-top: 6%;
  box-shadow: 1px 2px 3px grey;
  border-color: #9B4DE3;
  border-radius: 20px;
  width: max-content;
  font-size: large;
  background-color: #BB91E3;
`;
export default function Question() {
  const navigate=useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState({
    location: null,
    date: [],
    people: null,
    mood: [],
    menu: null,
  });
  const [isSelectComplete, setIsSelectComplete]=useState(true);
  const user=auth.currentUser;

  const updateAnswer = (category, value) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [category]: value,
    }));
  };
  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);
  
  const answerSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(selectedAnswers.location==null || selectedAnswers.date.length===0 || selectedAnswers.people==null || selectedAnswers.mood.length===0 || selectedAnswers.menu==null){
      setIsSelectComplete(false);
      return;
    } 
    try {
      const newDoc={
        user_id: user?.uid,
        location: selectedAnswers.location,
        date: selectedAnswers.date,
        people: selectedAnswers.people,
        mood: selectedAnswers.mood,
        menu: selectedAnswers.menu,
      };
      const combinedDate= `${selectedAnswers.date[0]}_${selectedAnswers.date[1]}_${selectedAnswers.date[2]}`;
      
      const userCollectionRef=collection(db, "quesAnswer", user?.uid,combinedDate);

      await addDoc(userCollectionRef,newDoc);
      navigate("/myplan");
      console.log("데이터 추가 완료!");
    } catch (e) {
      console.log(e);
    }  
  };
  return (
    <Wrapper>
      <DateSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <LocationSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <PeopleSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <MoodSelection $updateAnswer={updateAnswer}/>
      <Dots />
      <MenuSelection $updateAnswer={updateAnswer}/>
      {isSelectComplete? <></>: 
      <Alert>
        ❌ 선택하지 않은 항목이 있습니다. ❌
      </Alert>
      }
      <Button onClick={answerSubmit}>
       ✔️ Create A Plan Now
      </Button>
      
    </Wrapper>
  )
};