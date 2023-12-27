import '@picocss/pico';
import styled from 'styled-components';

const H1 = styled.h1`
    color: #ff9500;
    margin-top: 10%;
    margin-bottom: 30%;
    font-size: 70px;
`;

const A = styled.a`
    border-color: #ff9500;
    color: #ff9500;
    width: 60%;
    margin-bottom: 5%;
`;
export default function Loading() {
    return(
        <>
            <H1> One Day <br /> Wonder </H1>
            <A href='/create-account' role='button' className='outline'> 회원가입 </A>
            <A href='/login' role='button' className='outline'> 로그인 </A>
            <A href='#' role='button' className='outline'> Google로 로그인 </A>
            <A href='#' role='button' className='outline'> Apple로 로그인 </A>
        </>
    );
}