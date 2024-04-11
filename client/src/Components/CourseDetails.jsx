import { useState, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar"; // https://www.npmjs.com/package/react-circular-progressbar#react-circular-progressbar
import "react-circular-progressbar/dist/styles.css";
import { useUniversities } from "../contexts/AppContext";
import "animate.css";
import CourseComments from "./CourseComments";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';


export default function CourseDetails() {
      const {selectedCourse} = useUniversities()

    
    
    // useEffect(function () {
    //     fetch(`https://localhost:7204/api/Courses/GetAllCourses`)
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error("Network response was not ok");
    //         }
    //         return response.json(); // Parse JSON data from the response
    //       })
    //       .then((data) => {
    //         console.log(data);
    //         setCourses(data);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //       });
    //   }, []);

  //need to handle course after fetching, default is the first course/showing none
  //can pass the course id as prop and fetch based on the prop using UseEffect(?)
  // need to save for the course [avarage, max-score(optional),min-score(optional)], will be renderd in circular progress bars
  if(!selectedCourse) return
  return (
    <div className="course-details animate__animated animate__fadeIn ">
      <div className="details-wrapper">
        <div className="course-details-image">
          {/* <div style={{ width: 150, height: 150 }}>
            <CircularProgressbarWithChildren value={selectedCourse.avgGrade}>
            <div style={{ fontSize: 32, marginTop: -5 }}>
                <strong>{selectedCourse?.avgGrade}</strong>
              </div>
              <div style={{ fontSize: 16, marginTop: -5 }}>
                <strong>ממוצע קורס</strong> 
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbarWithChildren value={selectedCourse.maxGrade}>
            <div style={{ fontSize: 32, marginTop: -5 }}>
                <strong>{selectedCourse?.maxGrade}</strong>
              </div>
              <div style={{ fontSize: 16, marginTop: -5 }}>
                <strong>הכי גבוה</strong> 
              </div>
            </CircularProgressbarWithChildren>
          </div>
          <div style={{ width: 150, height: 150 }}>
            <CircularProgressbarWithChildren value={selectedCourse.minGrade}>
            <div style={{ fontSize: 32, marginTop: -5 }}>
                <strong>{selectedCourse?.minGrade}</strong>
              </div>
              <div style={{ fontSize: 16, marginTop: -5 }}>
                <strong>הכי נמוך</strong> 
              </div>
            </CircularProgressbarWithChildren>
          </div> */}
          <SparkLineChart
            data={[1, 4, 2, 5, 7, 2, 4, 6, 5, 7, 2, 4, 6, 5, 7, 2, 4, 6, 5, 7, 2, 4, 6].sort((a,b) => a-b)}
            height={100}
            showHighlight
            showTooltip
          />
        </div>
        <p className="course-info">שם: {selectedCourse?.courseName}</p>
        <p className="course-info"> מרצה: {selectedCourse?.lecturerName}</p>
        {/* <p className="course-info">תיאור:</p> */}
      </div>
      <CourseComments />
    </div>
  );
}
