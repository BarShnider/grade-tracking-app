import { useState, useEffect } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar"; // https://www.npmjs.com/package/react-circular-progressbar#react-circular-progressbar
import "react-circular-progressbar/dist/styles.css";
import { useUniversities } from "../contexts/AppContext";
import "animate.css";
import CourseComments from "./CourseComments";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';


export default function CourseDetails() {
  const { selectedCourse, connectedUser } = useUniversities();
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([
    9, 18, 18, 20, 30, 40, 55, 75, 88, 92, 100, 100, 10,
  ]);
  const [number, setNumber] = useState('');

  const xLabels = [
    "0-10",
    "11-20",
    "21-30",
    "31-40",
    "41-50",
    "51-60",
    "61-70",
    "71-80",
    "81-90",
    "91-100",
  ]; // Note the change here to cover up to 100 correctly
  const pData = categorizeGrades(grades, xLabels);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  function categorizeGrades(grades, ranges) {
    const rangeCounts = new Array(ranges.length).fill(0);
    
    grades.forEach((grade) => {
      const index = ranges.findIndex((range) => {
        const [min, max] = range.split("-").map(Number);
        return grade >= min && grade <= max;
      });
      if (index !== -1) {
        rangeCounts[index]++;
      }
    });

    return rangeCounts;
  }
  
  const handleChange = (event) => {
    const value = event.target.value;
    // Use a regular expression to allow only digits and ensure the value is within 0-100
    if (/^[0-9]*$/.test(value) && (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 100))) {
        setNumber(value);
    }
};
  
const userGradesCourse = async (userId, courseId, grade) => {
  try {
      const response = await fetch(
          `https://localhost:7204/api/User/UserGradesCourse/${userId}/${courseId}/${grade}`,
          {
              method: "POST", // Using POST method
              headers: {
                  "Content-Type": "application/json",
              },
              // No body is needed as data is passed via URL parameters
          }
      );

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json(); // Assuming the response will be JSON with the result
      console.log("Grade submitted successfully", result);
      setGrades((prevGrades) => [...prevGrades, parseInt(number)]);
      setNumber("")
      handleClose()
      getCourseGrades(selectedCourse.courseId)

      return result; // Returning the result from the API
  } catch (error) {
      console.error("Error submitting grade:", error);
      alert("Failed to submit grade");
      return null; // Return null or appropriate error handling
  }
};


  const getCourseGrades = async (courseId) => {
    try {
      const response = await fetch(
        `https://localhost:7204/api/Courses/GetAllCoursesGradesByCourseID/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const courseGrades = await response.json(); // Expecting the response to be a list of integers
      console.log("Fetched course grades successfully", courseGrades);
      setGrades(courseGrades)
      return courseGrades; // Return the grades or handle as needed
    } catch (error) {
      console.error("Error fetching course grades:", error);
      alert("Failed to fetch course grades");
      return []; // Return an empty array or handle the error appropriately
    }
  };


  const setRatingOnClick = async (newRating) => {
    // Assuming you have connectedUser's ID
    if (!connectedUser || !selectedCourse) {
      console.log("Missing user or course information");
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:7204/api/User/UserRatesCourse/${connectedUser.id}/${selectedCourse.courseId}/${newRating}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json(); // Get the result from your endpoint if necessary
      setRating(newRating); // Update the local state with the new rating
      console.log("Rating set successfully", result);

      // Optionally, navigate to another route after successful rating
      // navigate('/success-page');
    } catch (error) {
      console.error("Error setting rating:", error);
      alert("Failed to set rating");
    }
  };

  const getCourseAverageRating = async (courseId) => {
    try {
      const response = await fetch(
        `https://localhost:7204/api/Courses/GetCourseRating/${courseId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(!selectedCourse){
        return
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const averageRating = await response.json(); // Expecting the response to be a float representing the average rating
      setAvgRating(averageRating); // Update the local state with the fetched average rating
      console.log("Fetched average rating successfully", averageRating);
    } catch (error) {
      console.error("Error fetching average rating:", error);
      alert("Failed to fetch average rating");
    }
  };

  useEffect(() => {
    if (selectedCourse?.courseId) {
      getCourseAverageRating(selectedCourse.courseId);
      getCourseGrades(selectedCourse.courseId);
    }
  }, [selectedCourse]);

  const getUserRating = async (userId, courseId) => {
    try {
      const response = await fetch(
        `https://localhost:7204/api/User/GetUserRating/${courseId}/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const userRating = await response.json(); // Expecting the response to be a float representing the user's rating
      console.log("Fetched user rating successfully", userRating);
      setRating(userRating); // You might want to update a state or handle this value differently depending on your component structure
    } catch (error) {
      console.error("Error fetching user rating:", error);
      alert("Failed to fetch user rating");
      return 0; // Returning 0 or handling it as needed in case of an error
    }
  };

  useEffect(() => {
    if (
      selectedCourse &&
      selectedCourse.courseId &&
      connectedUser &&
      connectedUser.id
    ) {
      getCourseAverageRating(selectedCourse.courseId);
      getUserRating(connectedUser.id, selectedCourse.courseId);
    } else {
      console.log(
        "Either selectedCourse or connectedUser is not fully loaded yet"
      );
    }
  }, [selectedCourse, connectedUser]); // Depend on selectedCourse and connectedUser to refetch when they change

  useEffect(
    function () {
      getCourseAverageRating(selectedCourse?.courseId);
    },
    [rating]
  );

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
  if (!selectedCourse) return;
  return (
    <div className="course-details animate__animated animate__fadeIn ">
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{  position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,borderRadius:"10px",textAlign:"center"}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{textAlign:"center"}}>
            הוסף את ציונך בקורס <span style={{fontWeight:700}}>{selectedCourse.courseName}</span>
          </Typography>
          <TextField
          id="outlined-number"
          label="הזן ציון"
          type="number"
          value={number}
          onChange={handleChange}
          color="success"
          sx={{m:3}}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            min: 0, // Set minimum value
            max: 100, // Set maximum value
            inputMode: 'numeric',  // Ensure a numeric keyboard on mobile devices
            pattern: '[0-9]*'  // Pattern to suggest a numeric input without special characters
          }}
        />
            <Typography id="modal-modal-description" >
            <Button onClick={() => userGradesCourse(connectedUser.id,selectedCourse.courseId,number)} variant="outlined" color="success">עדכן</Button>
    </Typography>

        </Box>
      </Modal>
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
          </div> */}

          <BarChart
            // width={}
            // height={200}
            sx={{direction:"ltr"}}
            series={[
              {
                data: pData,
                label: "מספר סטודנטים",
                id: "gradeId",
                stack: "total",
              },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
          <div onClick={() => handleOpen()} className="add-grade-btn">הוסף ציון</div>
        </div>
        <Typography component="legend"> דירוג ממוצע: {avgRating.toFixed(1)}</Typography>
        <Rating
          sx={{ direction: "ltr" }}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRatingOnClick(newValue);
          }}
        />
        <p className="course-info">
          שם:{" "}
          <span style={{ fontWeight: "500" }}>
            {selectedCourse?.courseName}
          </span>
        </p>
        <p className="course-info">
          {" "}
          מרצה:{" "}
          <span style={{ fontWeight: "500" }}>
            {selectedCourse?.lecturerName}
          </span>
        </p>
        {/* <p className="course-info">תיאור:</p> */}
      <CourseComments />
      </div>
    </div>
  );
}
