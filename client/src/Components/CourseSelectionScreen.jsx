import { useEffect } from "react";
import { useUniversities } from "../contexts/AppContext";
import CourseContainer from "./CourseContainer";
import {useNavigate} from 'react-router-dom'
export default function CourseSelectionScreen(){
    const { connectedUser, loadingUser } = useUniversities();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!connectedUser && !loadingUser) {
        navigate('/login');
      }
    }, [connectedUser, navigate, loadingUser]);
    
    
    return (
        <CourseContainer />
    )
}