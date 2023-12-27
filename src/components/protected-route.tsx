import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
//import { auth } from "../firebase";

export default function ProtectedRoute({
  children, // component 내부의 모든 것을 받아옴
}: {
  children:React.ReactNode;
}){
  const user = auth.currentUser;
  if(user===null){
    return <Navigate to="/login" />;
  }
  return children;

}