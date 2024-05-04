import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUniversities } from "../contexts/AppContext";
import toast from "react-hot-toast";

function ValidateRegisterCodeModal({
    validationCode,
  isOpen,
  setIsCodeModalOpen,
  setIsCodeApproved
}) {
  const handleClose = () => setIsCodeModalOpen(false);

  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  const hebrewAndSignsRegex = /[\u0590-\u05FF.]+/;
  const { BASE_URL } = useUniversities();

  const [nameError, setNameError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [lecturerNameError, setLecturerNameError] = useState("");
  const [validation, setValidation] = useState("")

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

  const handleSubmit = () => {
    console.log("system: " , validationCode)
    console.log("user: " ,validation)
    
    if(Number(validation) === Number(validationCode)){
        setIsCodeApproved(true);
        setIsCodeModalOpen(false);
    }
    else {
        alert("wrong code!")
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
          label="קוד אימות"
          color={"success"}
          variant="outlined"
        //   onBlur={handleName}
          value={validation}
        //   error={!!nameError}
        //   helperText={nameError}
          onChange={(e) => setValidation(e.target.value)}
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

export default ValidateRegisterCodeModal;
