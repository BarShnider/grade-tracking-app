import { useState, useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useUniversities } from "../contexts/AppContext";
import "animate.css";
import CourseComments from "./CourseComments";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';

function generateRandomArray() {
  const size = 500; // The size of the array
  const max = 100; // Maximum value for the random numbers

  // Create an array of the specified size and fill it with random numbers
  const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * (max + 1)));

  return randomArray;
}

export default function CourseDetails() {
  const { selectedCourse, connectedUser, notifyFail,notifySuccess,BASE_URL } = useUniversities();
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
          `${BASE_URL}/User/UserGradesCourse/${userId}/${courseId}/${grade}`,
          {
              method: "POST", // Using POST method
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json(); // Assuming the response will be JSON with the result
     notifySuccess("הציון נוסף בהצלחה");
      setGrades((prevGrades) => [...prevGrades, parseInt(number)]);
      setNumber("")
      handleClose()
      getCourseGrades(selectedCourse.courseId)

      return result; // Returning the result from the API
  } catch (error) {
      notifyFail("התרחשה שגיאה בעת הוספת הציון");
      return null; // Return null or appropriate error handling
  }
};


  const getCourseGrades = async (courseId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/Courses/GetAllCoursesGradesByCourseID/${courseId}`,
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
      // setGrades(generateRandomArray()) // SET THIS TO SHOW COURSE FULL OF GRADES
      setGrades(courseGrades)
      return courseGrades; // Return the grades or handle as needed
    } catch (error) {
      notifyFail("התרחשה שגיאה בעת טעינת הציונים");
      return []; // Return an empty array or handle the error appropriately
    }
  };


  const setRatingOnClick = async (newRating) => {
    // Assuming you have connectedUser's ID
    if (!connectedUser || !selectedCourse ) {
      notifyFail("חסר מידע על המשתמש או הקורס");
      return;
    }

    if(!newRating) {
      return
    }

    try {
      const response = await fetch(
        `${BASE_URL}/User/UserRatesCourse/${connectedUser.id}/${selectedCourse.courseId}/${newRating}`,
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

    } catch (error) {
    }
  };

  const getCourseAverageRating = async (courseId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/Courses/GetCourseRating/${courseId}`,
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
    } catch (error) {
      notifyFail("התרחשה שגיאה בעת טעינת ממוצע הקורס");
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
        `${BASE_URL}/User/GetUserRating/${courseId}/${userId}`,
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
      setRating(userRating); // You might want to update a state or handle this value differently depending on your component structure
    } catch (error) {
      notifyFail("התרחשה שגיאה בעת טעינת דירוג המשתמש");
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
    } 
  }, [selectedCourse, connectedUser]); // Depend on selectedCourse and connectedUser to refetch when they change

  useEffect(
    function () {
      if(selectedCourse){
        getCourseAverageRating(selectedCourse?.courseId);
      }
    },
    [rating]
  );



  if (!selectedCourse) return (<div className="course-details course-details-no-course" >לא נבחר קורס להצגה</div>);
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
          <BarChart
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
          {connectedUser.email !== "guest@mail.com" && <div onClick={() => handleOpen()} className="add-grade-btn">הוסף ציון</div>}
        </div>
        <Typography component="legend"> דירוג ממוצע: {avgRating.toFixed(1)}</Typography>
        <Rating
          sx={{ direction: "ltr" }}
          name="simple-controlled"
          value={rating || avgRating}
          onChange={(event, newValue) => {
            setRatingOnClick(newValue);
          }}
           disabled={connectedUser.email === "guest@mail.com"}
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
      <CourseComments />
      </div>
    </div>
  );
}
