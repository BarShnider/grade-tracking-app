import ButtonsContainer from "./ButtonsContainer";
import Button from "./Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";
import { TailSpin } from  'react-loader-spinner'

const BASE_URL = `https://localhost:7204/api`;


export default function CourseList({ list }) {
  const [courses, setCourses] = useState([])
  const {num} = useParams()
  const {setSelectedCourse, selectedCourse} = useUniversities()
  const [isLoading, setIsLoading] = useState(false)  
  function onSelectedCourse(course){
    const newSelectedCourse = selectedCourse === course ? null : course;
    setSelectedCourse(newSelectedCourse);
    
  }
  useEffect(
    function () {
      if (num) {
        setIsLoading(true)
        fetch(
          `${BASE_URL}/Courses/GetAllCoursesBySemesterId/${num}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json(); // Parse JSON data from the response
          })
          .then((data) => {
            // console.log(data);
            setCourses(data);
          })
          .catch((err) => {
            console.error(err);
          }).finally(
            setIsLoading(false)
          );
      }
    },
    [num]
  );
  // if(isLoading) return   <TailSpin height="80"width="80"color="#4fa94d"ariaLabel="tail-spin-loading"radius="1"wrapperStyle={{}}wrapperClass=""visible={true}/>

  return (
    <>
      <ButtonsContainer isLoading={isLoading}>
        {courses.map(course => <Button selected={selectedCourse?.courseId === course.courseId} onClick={() =>  onSelectedCourse(course)} key={course.courseId}>{course.courseName}</Button>)}
      </ButtonsContainer>
    </>
  );
}



//GetAllCoursesBySemesterId/{semesterId}
