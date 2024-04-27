import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useUniversities } from "../contexts/AppContext";

function EditFacultyModal({
  facultyData,
  isOpen,
  setIsFacultyModalOpen,
  setFaculties,
  selectedUniversity,
  isAddNew,
}) {
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  const { BASE_URL } = useUniversities();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const handleClose = () => setIsFacultyModalOpen(false);

  useEffect(() => {
    if (isAddNew) {
      // Reset all fields if adding new university
      setName("");
    } else if (facultyData) {
      console.log(facultyData);
      // Populate fields with existing data if editing
      setName(facultyData.Name || "");
    }
  }, [isAddNew, facultyData]);

  const handleError = () => {
    if (name === "") {
      setNameError("שדה חובה*");
    } else if (!hebrewRegex.test(name)) {
      setNameError("נא להכניס רק אותיות בעברית ");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = async () => {
    if (nameError === "") {
      let facultyId = facultyData.FacultyId;
      const updatedFaculty = {
        FacultyId: facultyId,
        Name: name,
      };
      try {
        const response = await fetch(`${BASE_URL}/Faculties/EditFaculty`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFaculty),
        });
        const isEdited = await response.json();
        if (isEdited === 0) {
          alert("didnt update");
          return;
        } else {
          console.log("Edit details successful");
          setFaculties((prevFaculties) =>
            prevFaculties.map((faculty) => {
              if (faculty.FacultyId === facultyId) {
                return { ...faculty, ...updatedFaculty }; // Merge the updated details into the existing course
              }
              return faculty;
            })
          );
          handleClose();
        }
      } catch (error) {
        console.error("Edit error:", error);
        alert("Edit failed"); // Consider a more user-friendly error handling
      }
    }
  };

  const addFaculty = async () => {
    if (!name) {
      // You can also handle individual error states here if you prefer.
      alert("Please fill all fields correctly.");
      return;
    }

    // Assuming this is a required field but not managed in the form

    try {
      const response = await fetch(
        `${BASE_URL}/Faculties/AddFaculty/${selectedUniversity}/${name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Faculty added successfully", result);
        setFaculties((prev) => [...prev, result]);
        handleClose();
        // Optionally reset state or trigger a re-fetch/update of university list
      } else {
        throw new Error("Failed to add Faculty");
      }
    } catch (error) {
      console.error("Error adding Faculty:", error);
      alert("Failed to add Faculty");
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
        <h1 className="login-header">
          {isAddNew ? "הוספת פקולטה" : "עריכת פרטים"}
        </h1>

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
          onClick={isAddNew ? () => addFaculty() : () => handleSubmit()}
        >
          עדכן
        </Button>
      </Box>
    </Modal>
  );
}

export default EditFacultyModal;
