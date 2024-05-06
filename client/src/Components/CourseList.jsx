import ButtonsContainer from "./ButtonsContainer";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";



export default function CourseList() {
  const [courses, setCourses] = useState([])
  const {num} = useParams()
  const {setSelectedCourse, selectedCourse, BASE_URL} = useUniversities()
  const [isLoading, setIsLoading] = useState(false)
  
  function onSelectedCourse(course){
    const newSelectedCourse = selectedCourse === course ? null : course;
    setSelectedCourse(newSelectedCourse);
  }


  useEffect(() => {
    let type = num.split('-')[0];
    let id = num.split('-')[1];
    let query = "";

    if (type === "semester") {
      query = `GetAllCoursesBySemesterId/${id}`;
    } else if (type === "year") {
      query = `GetAllCoursesByYear/${id}`;
    } else if (type === "degree") {
      query = `GetAllCoursesByDegree/${id}`;
    }
    else if (type === "sq") {
      query = `GetAllCoursesByName/${id}`;
    }

    if (query) {
      setIsLoading(true);
      fetch(`${BASE_URL}/Courses/${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON data from the response
        })
        .then((data) => {
          setCourses(data);
          if (data && data.length > 0 ) {
            setSelectedCourse(data[0]); // Set the first course as selected if no course is currently selected
            
          }
          if (data.length === 0){
            setSelectedCourse(null)
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [num]); 
  return (
    <>
      <ButtonsContainer isLoading={isLoading}>
        {courses.length === 0 && <span className="list-no-courses">לא נמצאו קורסים להצגה</span>}
        {courses.map(course => <Button isMandatory={course.isMandatory} selected={selectedCourse?.courseId === course.courseId} onClick={() =>  onSelectedCourse(course)} key={course.courseId}>{course.courseName}            {num.startsWith("sq") && (
              <>
                <span className="course-location">
                    {course.degreeName} - {course.facultyName} - {course.universityName}</span>
              </>
            )} </Button>)}
      </ButtonsContainer>
    </>
  );
}



