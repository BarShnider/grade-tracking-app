import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button';
import { useState } from "react";

function EditCourseModal({courseData, isOpen, setIsCourseModalOpen}) {
    const handleClose = () => setIsCourseModalOpen(false);
    const [courseName, setCourseName] = useState(courseData.CourseName)
    const [courseCode, setCourseCode] = useState(courseData.CourseCode)
    const [lecturerName, setLecturerName] = useState(courseData.LecturerName)
    return (
<Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{  position: 'absolute',display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",flexDirection:"column",top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 400,bgcolor: 'background.paper',border: '2px solid #000',boxShadow: 24,p: 4,borderRadius:"10px",textAlign:"center"}}>
        <h1 className="login-header">עריכת פרטים</h1>

<TextField
  sx={{ width: "80%", direction: "ltr" }}
  id="outlined-basic"
  label="שם הקורס"
  color={"success"}
  variant="outlined"
  value={courseData.CourseName}
  onChange={(e) => setCourseName(e.target.value) }

/>
<TextField
  sx={{ width: "80%", direction: "ltr" }}
  id="outlined-basic"
  label="קוד קורס"
  color={"success"}
  variant="outlined"
  value={courseData.CourseCode}
onChange={(e) => setCourseCode(e.target.value) }
/>

<TextField
  sx={{ width: "80%", direction: "ltr" }}
  id="outlined-basic"
  label="שם מרצה"
  color={"success"}
  variant="outlined"
  value={courseData.LecturerName}
onChange={(e) => setLecturerName(e.target.value) }
/>


                      <Button onClick={() => console.log(courseName, courseCode, lecturerName)} variant="outlined" color="success">עדכן</Button>

        </Box>
      </Modal>
    )

}

export default EditCourseModal
