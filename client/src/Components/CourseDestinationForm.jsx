import { useNavigate } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";
import Button from "./Button";
import { useEffect, useState } from "react";
import SmallButton from "./SmallButton";
import ModalAddUniversity from "./ModalAddUniversity";
import ModalAddFaculty from "./ModalAddFaculty"

function generateHebrewLettersByIndex(index) {
  const startCodePoint = 0x05d0;
  const currentCodePoint = startCodePoint + index;
  const currentLetter = String.fromCharCode(currentCodePoint);
  return currentLetter;
}




function CourseDestinationForm() {
  const { universities, newCourse,setNewCourse, BASE_URL,notifyFail } = useUniversities();
  const [selectedUniv,setSelectedUniv] = useState(null)
  const [selectedFaculty,setSelectedFaculty] = useState(null)
  const [selectedDegree,setSelectedDegree] = useState(null)
  const [selectedYear,setSelectedYear] = useState(null)
  const [selectedSemester,setSelectedSemester] = useState(null)
  const [selectedFaculties, setSelectedFaculties] = useState([])
  const [selectedDegrees, setSelectedDegrees] = useState([])
  const [selectedYears, setSelectedYears] = useState([])
  const [selectedSemesters, setSelectedSemesters] = useState([])
  const [isLoading, setIsLoading] = useState(false) 



  async function getFacultiesByUniversity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/Faculties/GetFacultiesByUniversityId/${id}`);
      const data = await res.json();
      setSelectedFaculties(data);
    } catch {
      notifyFail("there was an error loading data..");
    } finally {
      setIsLoading(false);
    }
  }

     async function getDegreesByFaculty(id) {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/Degrees/GetAllDegreesByFacultyId/${id}`);
        const data = await res.json();
        setSelectedDegrees(data);
      } catch {
        notifyFail("there was an error loading data..");
      } finally {
        setIsLoading(false);
      }
    }
     async function getYearsByDegree(id) {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/Years/GetAllYearsByDegreeId/${id}`);
        const data = await res.json();
        setSelectedYears(data);
      } catch {
        notifyFail("there was an error loading data..");
      } finally {
        setIsLoading(false);
      }
    }

    async function getSemestersByYear(id) {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/Semesters/GetAllSemestersByYearId/${id}`);
        const data = await res.json();
        setSelectedSemesters(data);
      } catch {
        notifyFail("there was an error loading data..");
      } finally {
        setIsLoading(false);
      }
    }


  useEffect(function(){
    if(!selectedUniv) return
    getFacultiesByUniversity(selectedUniv)
  },[selectedUniv])

  useEffect(function(){
    if(!selectedFaculty) return
    getDegreesByFaculty(selectedFaculty)

    
  }
  ,[selectedFaculty])
  useEffect(function(){
    if(!selectedDegree) return
    getYearsByDegree(selectedDegree)
  }
  ,[selectedDegree])

  useEffect(function(){
    if(!selectedYear) return
    getSemestersByYear(selectedYear)
  },[selectedYear])
  
  function validateForm(){
    console.log("validating.....")
    if(selectedDegree === null || selectedFaculty === null || selectedSemester === null || selectedUniv === null || selectedYear === null){
      console.log("somthing is empty...")
    }
    else{
      console.log("all good, passed validation...")
      console.log("course details are:")
      console.log(newCourse)
      createNewCourse();
    }
  }

  async function createNewCourse() {
    try {
      const res = await fetch(`${BASE_URL}/Courses/AddNewCourse/${selectedSemester}`, {
        method: "POST",
        body: JSON.stringify(newCourse),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      console.log("course added succefully")
    } catch  {
      notifyFail("there was an error creating course..");
    } finally {
      navigate('/universities')
      setNewCourse(null)
    }
  }


  const navigate = useNavigate();
  return (
    <div className="add-form">
      <div className="dropdown-wrapper">
      <select value={selectedUniv || ''} onChange={(e) => setSelectedUniv(e.target.value)} className="select-box">
        <option disabled value="">בחר אוניברסיטה</option>
        {universities.map(univ => <option key={univ.universityId} value={univ.universityId}>{univ.name}</option>)}
      </select>
      <ModalAddUniversity setSelectedUniv={setSelectedUniv} />
      </div>
      <div className="dropdown-wrapper">
      <select className="select-box" value={selectedFaculty || ''} onChange={(e) => setSelectedFaculty(e.target.value)}>
      <option disabled value="">בחר פקולטה</option>
        {selectedFaculties.map(fac => <option key={fac.facultyId}   value={fac.facultyId}>{fac.name}</option>)}
      </select>
      <ModalAddFaculty />
      </div>
      <div className="dropdown-wrapper">
      <select  className="select-box"  value={selectedDegree || ''} onChange={(e) => setSelectedDegree(e.target.value)}>
      <option disabled value="">בחר תואר</option>
        {selectedDegrees.map(deg => <option key={deg.degreeId}  value={deg.degreeId}>{deg.name}</option>)}
      </select>
      <SmallButton>+</SmallButton>
      </div>
      <div className="dropdown-wrapper">
      <select  className="select-box"  value={selectedYear || ''} onChange={(e) => setSelectedYear(e.target.value)}>
      {<option disabled value="">בחר שנה</option>}
        {selectedYears.map(year => <option key={year.yearId}  value={year.yearId}>שנה {generateHebrewLettersByIndex(year.yearNumber - 1)}'</option>)}
      </select>
      <SmallButton>+</SmallButton>
      </div>
      <div className="dropdown-wrapper">
      <select  className="select-box"  value={selectedSemester || ''} onChange={(e) => setSelectedSemester(e.target.value)}>
      <option disabled value="">בחר סמסטר</option>
        {selectedSemesters.map(sem => <option key={sem.semesterId}  value={sem.semesterId}>{`${
              sem.semesterNumber === 3
                ? "סמסטר קיץ"
                : `סמסטר ${generateHebrewLettersByIndex(
                    sem.semesterNumber - 1
                  )}'`
            }`}</option>)}
      </select>
      <SmallButton>+</SmallButton>
      </div>
      <div className="back-next-container">
        <Button
          onClick={(e) => {
            e.preventDefault();
            setNewCourse(null)
            navigate(-1);

          }}
        >
          חזור
        </Button>
          <Button onClick={(e) => {e.preventDefault(); validateForm()}}>הוסף</Button>
      </div>
    </div>
  );
}

export default CourseDestinationForm;
