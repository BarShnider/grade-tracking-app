import { useEffect } from "react";
import { useUniversities } from "../contexts/AppContext";
import CourseContainer from "./CourseContainer";
import {useNavigate} from 'react-router-dom'
export default function CourseSelectionScreen(){
    const { connectedUser } = useUniversities();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!connectedUser) {
        navigate('/login');
      }
    }, [connectedUser, navigate]);
    
    
    return (
        <CourseContainer />
    )
}