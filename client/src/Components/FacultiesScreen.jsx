import { Link, useParams } from "react-router-dom"
import { useUniversities } from "../contexts/AppContext"
import { useEffect } from "react";
import Button from "./Button";
import ButtonsContainer from "./ButtonsContainer";
import FacultySelectionButtonContainer from "./FacultySelectionButtonContainer";

function FacultiesScreen() {
    const { id } = useParams();
    const {getFacultiesByUniversityId,faculties,isLoading} = useUniversities()
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
