import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useUniversities } from "../contexts/AppContext";

function EditDegreeModal({
  degreeData,
  isOpen,
  setIsDegreeModalOpen,
  setDegrees,
  selectedFaculty,
  isAddNew,
  notifySuccess
}) {
  const handleClose = () => setIsDegreeModalOpen(false);

  const { BASE_URL, notifyFail } = useUniversities();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;

  useEffect(() => {
    if (isAddNew) {
      // Reset all fields if adding new university
      setName("");
    } else if (degreeData) {
      // Populate fields with existing data if editing
      setName(degreeData.Name || "");
    }
  }, [isAddNew, degreeData]);

  const handleName = () => {
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
      let degreeId = degreeData.DegreeId;
      const updatedDegree = {
        DegreeId: degreeId,
        Name: name,
      };
      try {
        const response = await fetch(`${BASE_URL}/Degrees/EditDegree`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDegree),
        });
        const isEdited = await response.json();
        if (isEdited === 0) {
          notifyFail("Couln't update, please try again later");
          return;
        } else {
          notifySuccess("התואר עודכן בהצלחה!")
          setDegrees((prevDegrees) =>
            prevDegrees.map((degree) => {
              if (degree.DegreeId === degreeId) {
                return { ...degree, ...updatedDegree }; // Merge the updated details into the existing course
              }
              return degree;
            })
          );
          handleClose();
        }
      } catch (error) {
        notifyFail("התרחשה שגיאה בעת עריכת התואר"); // Consider a more user-friendly error handling
      }
    }
  };

  const addDegree = async () => {
    if (!name) {
      // You can also handle individual error states here if you prefer.
      notifyFail("נא להזין שם");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/Degrees/AddDegree/${selectedFaculty}/${name}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        notifySuccess("התואר נוסף בהצלחה!")
        setDegrees((prev) => [...prev, result]);
        handleClose();
        // Optionally reset state or trigger a re-fetch/update of university list
      } else {
        throw new Error("Failed to add Degree");
      }
    } catch (error) {
      notifyFail("התרחשה שגיאה בעת הוספת התואר");
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
          {isAddNew ? "הוספת תואר" : "עריכת פרטים"}
        </h1>

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
          onClick={isAddNew ? () => addDegree() : () => handleSubmit()}
        >
          עדכן
        </Button>
      </Box>
    </Modal>
  );
}

export default EditDegreeModal;
