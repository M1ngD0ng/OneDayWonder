import '@picocss/pico';
import { useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app"; 

const H1 = styled.h1`
    color: #ff9500;
    margin-top: 10%;
    font-size: 50px;
    a {
        text-decoration: none;
    }
`;
const H2 = styled.h2`
    color: #ff9500;
    margin-bottom: 10%;
`;
const Form = styled.form`
    width: 100%;
    color: #ff9500;
`;
const Label = styled.label`
    float: left;
`;
const Input = styled.input`
    border-color: #ff9500;
`;
const A = styled.a`
    color: #ff9500;
`;
const Button = styled.button`
    margin-top: 3%;
    background-color: #ff9500;
    border-color: #ff9500;
`;

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
        target: { name, value },
    } = e;
    //if (name === "name") {
    if (name === "nickname") {
        //setName(value);
      setNickname(value);
    } else if (name === "email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
};
const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    //if (isLoading || name === "" || email === "" || password === "") return;
    if (isLoading || nickname === "" || email === "" || password === "") return;
    try {
        setLoading(true);
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(credentials.user);
        await updateProfile(credentials.user, {
            //displayName: name,
            displayName: nickname,
        });
        navigate("/");
    } catch (e) {
        if(e instanceof FirebaseError){
            setError(e.message);
        }
    } finally {
        setLoading(false);
    }
};
  return(
      <>
          <H1><A href='/'> One Day Wonder </A></H1>
          <H2> 회원가입 </H2>
          <Form onSubmit={onSubmit}>
              <Label htmlFor="nickname"> Nickname </Label>
                  <Input onChange={onChange} type='text' id="nickname" name="nickname" value={nickname} placeholder='Nickname' required />

              <Label htmlFor="email"> Email </Label>
                  <Input onChange={onChange} type='email' id="email" name="email" value={email} placeholder='Email' required />
                  
              <Label htmlFor="password"> Password </Label>
                  <Input onChange={onChange} type='password' id="password" name="password" value={password} placeholder='Password' required />

              <A href='/login' className='secondary'> 로그인 하러가기 </A>

              <Button type='submit' value={isLoading ? "Loading..." : "Create Account"}>회원가입</Button>
                  
          </Form> 
      </>
  );
}