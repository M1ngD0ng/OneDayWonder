import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { auth } from "../firebase";
import '@picocss/pico';


const Wapper=styled.div`
  
`;
const Nav=styled.div`
position: fixed;
  bottom: 25px;
  left: 0;
  right: 0;
  height: 45px; 
  overflow: hidden;
  div{
    text-align: center;
    float: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 50px;
    width: 25%; 

    svg{
      width: 40px; 
      stroke: #ff9500;
      &:active{
        stroke: #ffff;
      }
    }
 
    /* &.log-out{
      border-color: tomato;
      svg{
        fill: tomato;
      }
    } */
  }
`;

export default function NavBar() {
  const navigate = useNavigate();
  const onLogOut=async()=>{
    const ok=confirm("Are you sure you want to log out?");
    if(ok){
      await auth.signOut();
      navigate("/login");
    }
  }; //나중에 켜기
  return (
    <Wapper>
    <Outlet/>
      <Nav className="wrapper"> 
      <NavLink to="/like">
        <div><svg data-slot="icon" fill="none" stroke-width="1.5"   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path>
    </svg></div>
      </NavLink>
      <NavLink to="/home">
        <div><svg data-slot="icon" fill="none" stroke-width="1.5"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
  </svg></div>
      </NavLink>
      <NavLink to="/myplan">
        <div><svg data-slot="icon" fill="none" stroke-width="1.5"   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"></path>
  </svg></div>
      </NavLink>
      <NavLink to="/mypage">
        <div><svg data-slot="icon" fill="none" stroke-width="1.5"   viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path>
  </svg></div> 
      </NavLink>
    </Nav>
    </Wapper>
  );
}