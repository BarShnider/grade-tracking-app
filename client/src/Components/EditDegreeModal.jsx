import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useUniversities } from "../contexts/AppContext";

function EditDegreeModal({ degreeData, isOpen, setIsDegreeModalOpen }) {
  const handleClose = () => setIsDegreeModalOpen(false);

  const { BASE_URL } = useUniversities();
  const [name, setName] = useState(degreeData.Name);
  const [nameError, setNameError] = useState("");

  const handleName = () => {
    if (name === "") {
      setNameError("שדה חובה*");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = async () => {
    if (nameError === "") {
      let degreeId = degreeData.DegreeId;
      const degree = {
        degreeId,
        name,
      };
      try {
        const response = await fetch(`${BASE_URL}/Degrees/EditDegree`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(degree),
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
          label="שם התואר"
          color={"success"}
          variant="outlined"
          onBlur={handleName}
          value={name}
          error={!!nameError}
          helperText={nameError}
          onChange={(e) => setName(e.target.value)}
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

export default EditDegreeModal;
