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
  const [query,setQuery] = useState("")
  function onSelectedCourse(course){
    const newSelectedCourse = selectedCourse === course ? null : course;
    setSelectedCourse(newSelectedCourse);
    
  }

  // useEffect(function(){
  //   let type = num.split('-')[0]
  //   let id = num.split('-')[1]
  //   console.log(type)
  //   console.log(id)
  //   if(type === "semester"){
  //     setQuery(`GetAllCoursesBySemesterId/${id}`)
  //   }
  //   else if(type === "year"){
  //     setQuery(`GetAllCoursesByYear/${id}`)
  //   }
  //   else if(type === "degree"){
  //     setQuery(`GetAllCoursesByDegree/${id}`)
  //   }
    
  // },[num])
  // useEffect(
  //   function () {
  //     if (num) { // OPTION: CAN ADD 'ELSE' WHEN THERE IS NO PARAMS AND THEN GET
  //       setIsLoading(true)
  //       fetch(
  //         `${BASE_URL}/Courses/${query}`
  //       )
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok");
  //           }
  //           return response.json(); // Parse JSON data from the response
  //         })
  //         .then((data) => {
  //           // console.log(data);
  //           setCourses(data);
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         }).finally(
  //           setIsLoading(false)
  //         );
  //     }

  //   },
  //   [query]
  // );

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
          console.log(data)
          setCourses(data);
          if (data && data.length > 0 && !selectedCourse) {
            setSelectedCourse(data[0]); // Set the first course as selected if no course is currently selected
            
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
        {courses.map(course => <Button isMandatory={course.isMandatory} selected={selectedCourse?.courseId === course.courseId} onClick={() =>  onSelectedCourse(course)} key={course.courseId}>{course.courseName}</Button>)}
      </ButtonsContainer>
    </>
  );
}



//GetAllCoursesBySemesterId/{semesterId}
