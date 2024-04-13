import { useState, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar"; // https://www.npmjs.com/package/react-circular-progressbar#react-circular-progressbar
import "react-circular-progressbar/dist/styles.css";
import { useUniversities } from "../contexts/AppContext";
import "animate.css";
import CourseComments from "./CourseComments";
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function CourseDetails() {
      const {selectedCourse,connectedUser} = useUniversities()
      const [rating, setRating] = useState(0);
      const [avgRating, setAvgRating] = useState(0)

      const setRatingOnClick = async (newRating) => {
        // Assuming you have connectedUser's ID
        if (!connectedUser || !selectedCourse) {
          console.log('Missing user or course information');
          return;
        }
    
        try {
          const response = await fetch(`https://localhost:7204/api/User/UserRatesCourse/${connectedUser.id}/${selectedCourse.courseId}/${newRating}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const result = await response.json(); // Get the result from your endpoint if necessary
          setRating(newRating); // Update the local state with the new rating
          console.log('Rating set successfully', result);
    
          // Optionally, navigate to another route after successful rating
          // navigate('/success-page');
    
        } catch (error) {
          console.error('Error setting rating:', error);
          alert('Failed to set rating');
        }
      };
    
      const getCourseAverageRating = async (courseId) => {
        try {
          const response = await fetch(`https://localhost:7204/api/Courses/GetCourseRating/${courseId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const averageRating = await response.json(); // Expecting the response to be a float representing the average rating
          setAvgRating(averageRating); // Update the local state with the fetched average rating
          console.log('Fetched average rating successfully', averageRating);
      
        } catch (error) {
          console.error('Error fetching average rating:', error);
          alert('Failed to fetch average rating');
        }
      };
      
      useEffect(() => {
        if (selectedCourse?.courseId) {
          getCourseAverageRating(selectedCourse.courseId);
        }
      }, [selectedCourse]);

      const getUserRating = async (userId, courseId) => {
        try {
          const response = await fetch(`https://localhost:7204/api/User/GetUserRating/${courseId}/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const userRating = await response.json(); // Expecting the response to be a float representing the user's rating
          console.log('Fetched user rating successfully', userRating);
          setRating(userRating); // You might want to update a state or handle this value differently depending on your component structure
      
        } catch (error) {
          console.error('Error fetching user rating:', error);
          alert('Failed to fetch user rating');
          return 0; // Returning 0 or handling it as needed in case of an error
        }
      };

      useEffect(() => {
        if (selectedCourse && selectedCourse.courseId && connectedUser && connectedUser.id) {
          getCourseAverageRating(selectedCourse.courseId);
          getUserRating(connectedUser.id, selectedCourse.courseId);
        } else {
          console.log('Either selectedCourse or connectedUser is not fully loaded yet');
        }
      }, [selectedCourse, connectedUser]); // Depend on selectedCourse and connectedUser to refetch when they change
    
      useEffect(function(){
        getCourseAverageRating(selectedCourse?.courseId)
      },[rating])
    
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
        <Typography component="legend"> דירוג ממוצע: {avgRating}</Typography>
      <Rating
      sx={{direction:"ltr"}}
        name="simple-controlled"
        value={rating}
        onChange={(event, newValue) => {
          setRatingOnClick(newValue);
        }}
      />
        <p className="course-info">שם: <span style={{fontWeight:"500"}}>{selectedCourse?.courseName}</span></p>
        <p className="course-info"> מרצה: <span style={{fontWeight:"500"}}>{selectedCourse?.lecturerName}</span></p>
        {/* <p className="course-info">תיאור:</p> */}
      </div>
      <CourseComments />
    </div>
  );
}
