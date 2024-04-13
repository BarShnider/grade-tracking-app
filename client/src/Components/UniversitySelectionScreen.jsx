import { useEffect } from "react";
import { useUniversities } from "../contexts/AppContext";
import NavigateArrow from "./NavigateArrow";
import Spinner from "./Spinner";
import UniversitiesContainer from "./UniversitiesContainer";
import University from "./University";
import {useNavigate} from 'react-router-dom'
export default function UniversitySelectionScreen() {
  const { connectedUser } = useUniversities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!connectedUser) {
      navigate('/login');
    }
  }, [connectedUser, navigate]);
  return (
    
    <>
      <NavigateArrow type='up'/>
      <UniversitiesContainer />
      <NavigateArrow type='down'/>
      
    </>
  );
}
