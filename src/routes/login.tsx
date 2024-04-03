import '@picocss/pico';
import { useState } from 'react';
import { auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 
import { A, Button, Div, Form, H1, H2, Input, Label, Wrapper } from '../components/style/style-login';

export default function Login() {
  const navigate=useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // 홈화면으로 이동시킴
    } catch (e) {
      if(e instanceof FirebaseError){
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const onGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth,provider);
      navigate("/");
    } catch (e) {
      console.error(e);
    }

  };

  return(
      <Wrapper>
        <H1> One Day Wonder </H1>
        <H2> 로그인 </H2>
        <Form onSubmit={onSubmit}>
          <Label htmlFor="email"> Email </Label>
          <Input onChange={onChange} type='email' id="email" name="email" value={email} placeholder='Email' required />
                    
          <Label htmlFor="password"> Password </Label>
          <Input onChange={onChange} type='password' id="password" name="password" value={password} placeholder='Password' required />
          <Div>
            <A href='#' className='secondary find'> 이메일/비밀번호 찾기 </A>
            <A href='/create-account' className='secondary'> 회원가입 하러가기 </A>
          </Div>
          <Button type='submit' value={isLoading ? "Loading..." : "Log In"} >로그인</Button>              
        </Form>
        <Button onClick={onGoogleClick} >Google로 로그인</Button>
      </Wrapper>
  );
}