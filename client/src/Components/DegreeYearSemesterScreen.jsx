import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import ButtonsContainer from "./ButtonsContainer";
import DegreeYearSemesterContainer from "./DegreeYearSemesterContainer";
import Button from "./Button";
import NextButton from "./NextButton";
import { useState, useEffect } from "react";

const BASE_URL = `https://localhost:7204/api`;

function generateHebrewLettersByIndex(index) {
  const startCodePoint = 0x05d0;
  const currentCodePoint = startCodePoint + index;
  const currentLetter = String.fromCharCode(currentCodePoint);
  return currentLetter;
}

export default function DegreeYearSemesterScreen() {
  // generateHebrewLettersByIndex(0)
  const [degrees, setDegrees] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [years, setYears] = useState([]);
  const { facId } = useParams();
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [param,setParam] = useState("")
  function handleDegClick(degree) {
    const newSelectedDegree = selectedDegree === degree ? null : degree;
    setSelectedDegree(newSelectedDegree);
  }

  function handleYearClick(year) {
    const newSelectedYear = selectedYear === year ? null : year;
    setSelectedYear(newSelectedYear);
  }

  function handleSemesterClick(semester) {
    const newSelectedSemester = selectedSemester === semester ? null : semester;
    console.log(newSelectedSemester)
    setSelectedSemester(newSelectedSemester);
    console.log(selectedSemester)
  }

  // console.log(useParams())
  useEffect(
    function () {
      fetch(`${BASE_URL}/Degrees/GetAllDegreesByFacultyId/${facId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON data from the response
        })
        .then((data) => {
          console.log(data);
          setDegrees(data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [facId]
  );

  useEffect(
    function () {
      if (selectedDegree) {
        fetch(
          `${BASE_URL}/Years/GetAllYearsByDegreeId/${selectedDegree?.degreeId}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON data from the response
          })
          .then((data) => {
            console.log(data);
            setYears(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [selectedDegree]
  );

  useEffect(
    function () {
      if (selectedYear) {
        fetch(
          `${BASE_URL}/Semesters/GetAllSemestersByYearId/${selectedYear?.yearId}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON data from the response
          })
          .then((data) => {
            console.log(data);
            setSemesters(data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
    [selectedYear]
  );

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
        <ButtonsContainer key="degCont" label={"תואר:"}>
          {degrees.map((deg) => (
            <Button
              key={deg.degreeId}
              selected={selectedDegree?.degreeId === deg.degreeId}
              onClick={() => handleDegClick(deg)}
            >
              {deg.name}
            </Button>
          ))}
        </ButtonsContainer>
        <ButtonsContainer key="yearCont" label={"שנה:"}>
          {years.length > 0 &&
            years.map((year) => (
              <Button
                key={year.yearId}
                selected={selectedYear?.yearId === year.yearId}
                onClick={() => handleYearClick(year)}
              >
                שנה {generateHebrewLettersByIndex(year.yearNumber - 1)}'
              </Button>
            ))}
        </ButtonsContainer>
        <ButtonsContainer key="semCont" label={"סמסטר:"}>
          {semesters.map((sem) => (
            <Button
              key={sem.semesterId}
              selected={selectedSemester?.semesterId === sem.semesterId}
              onClick={() => handleSemesterClick(sem)}
            >{`${
              sem.semesterNumber === 3
                ? "סמסטר קיץ"
                : `סמסטר ${generateHebrewLettersByIndex(
                    sem.semesterNumber - 1
                  )}'`
            }`}</Button>
          ))}
        </ButtonsContainer>
      </DegreeYearSemesterContainer>
      <div className="next-btn-wrapper">
        <Link to={`next/${param}`}>
        <NextButton  >הבא</NextButton>
        </Link>
      </div>
    </div>
  );
}
