import { Link, useParams } from "react-router-dom"
import { useUniversities } from "../contexts/AppContext"
import { useEffect } from "react";
import Button from "./Button";
import FacultySelectionButtonContainer from "./FacultySelectionButtonContainer";
import {useNavigate} from 'react-router-dom'
function FacultiesScreen() {
    const { id } = useParams();
    const {connectedUser , getFacultiesByUniversityId,faculties,isLoading,loadingUser} = useUniversities()
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!connectedUser && !loadingUser) {
        navigate('/login');
      }
    }, [connectedUser, navigate,loadingUser]);

    useEffect(function(){
        getFacultiesByUniversityId(id)
    },[id])
    if(isLoading) return <span>Loading...</span>
    return (
        <div className="faculties">
            <FacultySelectionButtonContainer>
            {faculties.map(fac =><Link key={fac.facultyId}  to={`faculties/${fac.facultyId}`}><Button>{fac.name}</Button></Link> )}
            </FacultySelectionButtonContainer>

        </div>
    )
}

export default FacultiesScreen
