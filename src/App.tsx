import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Loading from "./components/loading";
import '@picocss/pico';
import CreateAccount from "./routes/createAccount";
import Login from "./routes/login";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/protected-route";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import MyPage from "./routes/mypage";
import Home from "./routes/home";
import MyPlan from "./routes/myplan";
import Like from "./routes/like";
import reset from "styled-reset";
import CreatePlan from "./routes/createPlan";
import Place from "./routes/detail-place";
import Search from "./routes/search";
import { Provider } from "react-redux";


const router = createBrowserRouter([
  {
    path: "/",
    element: (<ProtectedRoute>
      <NavBar />
    </ProtectedRoute>
    ),
    children: [
      {
        path: "/", 
        element: <Home />,
      },
      {
        path: "/like",
        element: <Like />,
      },
      {
        path: "/myplan",
        element: <MyPlan />, 
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/place/:id",
        element: <Place />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/create-plan",
        element: <CreatePlan />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  height: 100%; 
  text-align: center;
`;

function App() {
  const [isLoading, setLoading]=useState(true);
  const init = async()=>{
    await auth.authStateReady();
    setLoading(false);
  }
  useEffect(()=>{
    init();
  },[]);
  return (
    <>
      <GlobalStyles/>
      {isLoading? <Loading />:<RouterProvider router={router} /> }
    </>
  );
}

export default App;