import { Link, useParams } from "react-router-dom";
import ButtonsContainer from "./ButtonsContainer";
import DegreeYearSemesterContainer from "./DegreeYearSemesterContainer";
import Button from "./Button";
import NextButton from "./NextButton";
import { useState, useEffect } from "react";
import { useUniversities } from "../contexts/AppContext";
import {useNavigate} from 'react-router-dom'

function generateHebrewLettersByIndex(index) {
  const startCodePoint = 0x05d0;
  const currentCodePoint = startCodePoint + index;
  const currentLetter = String.fromCharCode(currentCodePoint);
  return currentLetter;
}

export default function DegreeYearSemesterScreen() {
  // generateHebrewLettersByIndex(0)
  const { connectedUser, getFacultiesByUniversityId ,loadingUser,faculties, BASE_URL,notifyFail} = useUniversities();
  const [degrees, setDegrees] = useState([]);
  const {id } = useParams();
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [param,setParam] = useState("")
  const navigate = useNavigate();

  

  useEffect(() => {
    if (!connectedUser && !loadingUser) {
      navigate('/login');
    }
  }, [connectedUser, navigate,loadingUser]);


  useEffect(function(){
    getFacultiesByUniversityId(id)
},[id])
  function handleDegClick(degree) {
    const newSelectedDegree = selectedDegree === degree ? null : degree;
    setSelectedDegree(newSelectedDegree);
  }


  function handleFacultyClick(faculty) {
    const newSelectedFaculty = selectedFaculty === faculty ? null : faculty;
    setSelectedFaculty(newSelectedFaculty);
  }
  
  useEffect(() => {
    if (selectedFaculty) {
      const fetchDegrees = async () => {
        try {
          const response = await fetch(`${BASE_URL}/Degrees/GetAllDegreesByFacultyId/${selectedFaculty.facultyId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const degreesData = await response.json();
          setDegrees(degreesData);
        } catch (error) {
          notifyFail("התרחשה שגיאה בעת טעינת התארים");
          setDegrees([]); // Optionally reset the degrees on error
        }
      };
  
      fetchDegrees();
    } else {
      setDegrees([]); // Reset degrees when there is no selected faculty
    }
  }, [selectedFaculty]);

  useEffect(function(){
    if (selectedDegree && !selectedYear && !selectedSemester ){
      setParam(`degree-${selectedDegree.degreeId}`)
    }
    else if (selectedDegree && selectedYear && !selectedSemester ){
      setParam(`year-${selectedYear.yearId}`)
    }
    else if (selectedDegree && selectedYear && selectedSemester ){
      setParam(`semester-${selectedSemester.semesterId}`)
    }

  },[selectedDegree,selectedSemester,selectedYear])

  return (
    <div style={{ textAlign: "center" }}>
      <DegreeYearSemesterContainer>
      <ButtonsContainer key="facCont" label={"פקולטה:"}>
      {faculties.length === 0 && <span>לא נמצאו פקולטות</span> }

  {faculties.map((faculty) => (
    <Button
      key={faculty.facultyId}
      selected={selectedFaculty?.facultyId === faculty.facultyId}
      onClick={() => handleFacultyClick(faculty)}
    >
      {faculty.name}
    </Button>
  ))}
</ButtonsContainer>

        {selectedFaculty && <ButtonsContainer key="degCont" label={"תואר:"}>
          {degrees.length === 0 && <span>לא נמצאו תארים</span> }
          {degrees.map((deg) => (
            <Button
              key={deg.degreeId}
              selected={selectedDegree?.degreeId === deg.degreeId}
              onClick={() => handleDegClick(deg)}
            >
              {deg.name}
            </Button>
          ))}
        </ButtonsContainer>}
      </DegreeYearSemesterContainer>
      {selectedFaculty && selectedDegree ?<div className="next-btn-wrapper">
        <Link to={`next/${param}`}>
        <NextButton  >הבא</NextButton>
        </Link>
      </div> : null}
    </div>
  );
}
