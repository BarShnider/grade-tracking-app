import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useUniversities } from "../contexts/AppContext";

function EditFacultyModal({ facultyData, isOpen, setIsFacultyModalOpen, isAddNew }) {
  const { BASE_URL } = useUniversities();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const handleClose = () => setIsFacultyModalOpen(false);

  useEffect(() => {
    if (isAddNew) {
      // Reset all fields if adding new university
      setName("");
    } else if (facultyData) {
      // Populate fields with existing data if editing
      setName(facultyData.name || "");
    }
  }, [isAddNew, facultyData]);


  const handleError = () => {
    if (name === "") {
      setNameError("שדה חובה*");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = async () => {
    if (nameError === "") {
      let facultyId = facultyData.FacultyId;
      const faculty = {
        facultyId,
        name,
      };
      try {
        const response = await fetch(`${BASE_URL}/Faculties/EditFaculty`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(faculty),
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
        <h1 className="login-header">{isAddNew? "הוספת פקולטה": "עריכת פרטים"}</h1>

        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="שם הפקולטה"
          color={"success"}
          variant="outlined"
          onBlur={handleError}
          error={!!nameError}
          helperText={nameError}
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <Button
          variant="outlined"
          color="success"
          onClick={isAddNew? () => console.log(name):() => handleSubmit()}
        >
          עדכן
        </Button>
      </Box>
    </Modal>
  );
}

export default EditFacultyModal;
