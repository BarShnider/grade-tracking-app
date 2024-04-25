import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUniversities } from "../contexts/AppContext";

function EditUserModal({ userData, isOpen, setIsUserModalOpen }) {
  const handleClose = () => setIsUserModalOpen(false);

  const { BASE_URL } = useUniversities();
  const [email, setEmail] = useState(userData.email);
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;

  const handleEmail = () => {
    if (email === "") {
      setEmailError("שדה חובה*");
    } else if (!emailRegex.test(email)) {
      setEmailError("נא להכניס מייל בפורמט הבא example@example.com");
    } else {
      setEmailError("");
    }
  };
  const handleFirstName = () => {
    if (firstName === "") {
      setFirstNameError("שדה חובה*");
    } else if (!hebrewRegex.test(firstName)) {
      setFirstNameError("נא להכניס רק אותיות בעברית ");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastName = () => {
    if (lastName === "") {
      setLastNameError("שדה חובה*");
    } else if (!hebrewRegex.test(lastName)) {
      setLastNameError("נא להכניס רק אותיות בעברית ");
    } else {
      setLastNameError("");
    }
  };

  const handleSubmit = async () => {
    if (emailError === "" && firstNameError === "" && lastNameError === "") {
      let id = userData.id;
      let password = "";
      const user = {
        id,
        email,
        password,
        firstName,
        lastName,
      };
      try {
        const response = await fetch(`${BASE_URL}/User/EditUser`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const isEdited = await response.json();
        if (isEdited === 0) {
          alert("didnt update");
          return;
        } else {
          console.log("Edit details successful");
          handleClose();
        }
      } catch (error) {
        console.error("Edit error:", error);
        alert("Edit failed"); // Consider a more user-friendly error handling
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
          label="מייל"
          color={"success"}
          variant="outlined"
          onBlur={handleEmail}
          value={email}
          error={!!emailError}
          helperText={emailError}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="שם פרטי"
          color={"success"}
          variant="outlined"
          onBlur={handleFirstName}
          value={firstName}
          error={!!firstNameError}
          helperText={firstNameError}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="שם משפחה"
          color={"success"}
          variant="outlined"
          onBlur={handleLastName}
          value={lastName}
          error={!!lastNameError}
          helperText={lastNameError}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Button
          variant="outlined"
          color="success"
          onClick={() => handleSubmit()}
        >
          עדכן
        </Button>
      </Box>
    </Modal>
  );
}

export default EditUserModal;
