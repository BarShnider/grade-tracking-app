import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUniversities } from "../contexts/AppContext";
function EditCourseModal({
  courseData,
  isOpen,
  setCourses,
  setIsCourseModalOpen,
  notifySuccess
}) {
  const handleClose = () => setIsCourseModalOpen(false);

  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  const hebrewAndSignsRegex = /[\u0590-\u05FF.]+/;
  const { BASE_URL, notifyFail } = useUniversities();

  const [courseName, setCourseName] = useState(courseData.CourseName);
  const [courseCode, setCourseCode] = useState(courseData.CourseCode);
  const [lecturerName, setLecturerName] = useState(courseData.LecturerName);

  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [lecturerNameError, setLecturerNameError] = useState("");

  const handleName = () => {
    if (courseName === "") {
      setNameError("שדה חובה*");
    } else if (!hebrewRegex.test(courseName)) {
      setNameError("נא להכניס רק אותיות בעברית ");
    } else {
      setNameError("");
    }
  };
  const handleCourseCode = () => {
    if (courseCode === "") {
      setCodeError("שדה חובה*");
    } else {
      setCodeError("");
    }
  };
  const handleLecturerName = () => {
    if (lecturerName === "") {
      setLecturerNameError("שדה חובה*");
    } else if (!hebrewAndSignsRegex.test(lecturerName)) {
      setLecturerNameError("נא להכניס רק אותיות בעברית ");
    } else {
      setLecturerNameError("");
    }
  };

  const handleSubmit = async () => {
    if (nameError === "" && codeError === "" && lecturerNameError === "") {
      let courseID = courseData.CourseId;
      const updatedCourse = {
        CourseId: courseID, // Use the property names as expected by your DataGrid
        CourseCode: courseCode, // Updated course code
        CourseName: courseName, // Updated course name
        LecturerName: lecturerName, // Updated lecturer name
      };
      try {
        const response = await fetch(`${BASE_URL}/Courses/EditCourse`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCourse),
        });
        const isEdited = await response.json();
        if (isEdited === 0) {
          notifyFail("Couln't update, please try again later");
          return;
        } else {

          console.log("Edit details successful");
          notifySuccess("הקורס עודכן בהצלחה!")
          setCourses((prevCourses) =>
            prevCourses.map((course) => {
              if (course.CourseId === courseID) {
                return { ...course, ...updatedCourse }; // Merge the updated details into the existing course
              }
              return course;
            })
          );
          handleClose();
        }
      } catch (error) {
        console.error("Edit error:", error);
        notifyFail("Edit failed"); // Consider a more user-friendly error handling
      }
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h1 className="login-header">עריכת פרטים</h1>

        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="שם הקורס"
          color={"success"}
          variant="outlined"
          onBlur={handleName}
          value={courseName}
          error={!!nameError}
          helperText={nameError}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="קוד קורס"
          color={"success"}
          variant="outlined"
          onBlur={handleCourseCode}
          value={courseCode}
          error={!!codeError}
          helperText={codeError}
          onChange={(e) => setCourseCode(e.target.value)}
        />

        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="שם מרצה"
          color={"success"}
          variant="outlined"
          onBlur={handleLecturerName}
          value={lecturerName}
          error={!!lecturerNameError}
          helperText={lecturerNameError}
          onChange={(e) => setLecturerName(e.target.value)}
        />
        <Button
          onClick={() => handleSubmit()}
          variant="outlined"
          color="success"
        >
          עדכן
        </Button>
      </Box>
    </Modal>
  );
}

export default EditCourseModal;
