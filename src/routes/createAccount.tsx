import '@picocss/pico';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; 
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app"; 
import { A, Button, Div, Form, H1, H2, Input, Label, Wrapper } from '../components/style/style-createAccount';

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
    if (name === "nickname") {
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
    if (isLoading || nickname === "" || email === "" || password === "") return;
    try {
        setLoading(true);
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(credentials.user);
        await updateProfile(credentials.user, {
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
      <Wrapper>
        <H1><A href='/'> One Day Wonder </A></H1>
            <H2> 회원가입 </H2>
            <Form onSubmit={onSubmit}>
                <Label htmlFor="nickname"> Nickname </Label>
                    <Input onChange={onChange} type='text' id="nickname" name="nickname" value={nickname} placeholder='Nickname' required />

                <Label htmlFor="email"> Email </Label>
                    <Input onChange={onChange} type='email' id="email" name="email" value={email} placeholder='Email' required />
                    
                <Label htmlFor="password"> Password </Label>
                    <Input onChange={onChange} type='password' id="password" name="password" value={password} placeholder='Password' required />
                <Div>
                    <A href='/login' className='secondary'> 로그인 하러가기 </A>
                </Div>
                <Button type='submit' value={isLoading ? "Loading..." : "Create Account"}>회원가입</Button>
                  
          </Form> 
      </Wrapper>
  );
}