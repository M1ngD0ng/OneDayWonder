import '@picocss/pico';
import { useState } from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
    color: #ff9500;
    margin-top: 10%;
    font-size: 50px;
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
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <>
            <H1> One Day Wonder </H1>
            <H2> 회원가입 </H2>
            <Form>
                <Label htmlFor="nickname"> Nickname </Label>
                    <Input type='text' id="nickname" name="nickname" value={nickname} placeholder='Nickname' required />

                <Label htmlFor="email"> Email </Label>
                    <Input type='email' id="email" name="email" value={email} placeholder='Email' required />
                    
                <Label htmlFor="password"> Password </Label>
                    <Input type='password' id="password" name="password" value={password} placeholder='Password' required />

                <A href='/login' className='secondary'> 이미 회원입니다. 로그인하기 </A>

                <Button type='submit'>Submit</Button>
                    
            </Form>
        </>
    );
}