import { RouterProvider, createBrowserRouter } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Loading from "./components/loading";
import '@picocss/pico';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Loading />,
    children: [
      {
        path: "/home",
        //element: <Home />,
      },
      {
        path: "/mypage",
        //element: <Mypage />,
      },
      {
        path: "/place",
        //element: <Place />,
      },
      {
        path: "/search",
        //element: <Search />,
      },
    ],
  },
  {
    path: "/login",
    //element: <Login />,
  },
  {
    path: "/create-account",
    //element: <CreateAccount />,
  },
]);

const Main = styled.main`
  text-align: center;
`;

function App() {
  return (
    <Main className='container'>
      <RouterProvider router={router} />
    </Main>
  );
}

export default App;
