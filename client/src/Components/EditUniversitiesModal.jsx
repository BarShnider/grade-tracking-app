import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useUniversities } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function EditUniversitiesModal({
  universityData,
  isOpen,
  setIsUniversitiesModalOpen,
  setUniversities,
  isAddNew,
}) {
  const handleClose = () => setIsUniversitiesModalOpen(false);
  const { BASE_URL } = useUniversities();
  const navigate = useNavigate();

  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(:[0-9]{1,5})?(\/[\w\.-]*)*\/?(\?[\w\.-=&]*)?(#[\w\.-]*)?$/;
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  const [universityId, setUniversityId] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (isAddNew) {
      // Reset all fields if adding new university
      setUniversityId("");
      setName("");
      setLocation("");
      setWebsite("");
      setImageUrl("");
    } else if (universityData) {
      // Populate fields with existing data if editing
      setUniversityId(universityData.universityId || "");
      setName(universityData.name || "");
      setLocation(universityData.location || "");
      setWebsite(universityData.website || "");
      setImageUrl(universityData.imageUrl || "");
    }
  }, [isAddNew, universityData]);

  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [logoError, setLogoError] = useState("");

  const handleName = (name) => {
    setName(name);
    if (name === "") {
      setNameError("שדה חובה*");
    } else if (!hebrewRegex.test(name)) {
      setNameError("נא להכניס רק אותיות בעברית ");
    } else {
      setNameError("");
    }
  };

  const handleLocation = (location) => {
    setLocation(location);
    if (location === "") {
      setLocationError("שדה חובה*");
    } else if (!hebrewRegex.test(location)) {
      setLocationError("נא להכניס רק אותיות בעברית ");
    } else {
      setLocationError("");
    }
  };

  const handleWebsite = (website) => {
    setWebsite(website);
    if (website === "") {
      setWebsiteError("שדה חובה*");
    } else if (!urlRegex.test(website)) {
      setWebsiteError("נא להכניס רק אותיות באנגלית ");
    } else {
      setWebsiteError("");
    }
  };

  const handleLogo = (logo) => {
    setImageUrl(logo);
    if (logo === "") {
      setLogoError("שדה חובה*");
    } else if (!urlRegex.test(logo)) {
      setLogoError("נא להכניס רק אותיות באנגלית ");
    } else {
      setLogoError("");
    }
  };

  const addUniversity = async () => {
    if (!name || !location || !website || !imageUrl) {
      // You can also handle individual error states here if you prefer.
      alert("Please fill all fields correctly.");
      return;
    }

    const university = {
      name,
      location,
      website,
      imageUrl,
      establishedYear: 0, // Assuming this is a required field but not managed in the form
    };

    try {
      const response = await fetch(`${BASE_URL}/Universities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(university),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("University added successfully", result);
        setUniversities((prev) => [...prev, result]);
        handleClose();
        // Optionally reset state or trigger a re-fetch/update of university list
      } else {
        throw new Error("Failed to add university");
      }
    } catch (error) {
      console.error("Error adding university:", error);
      alert("Failed to add university");
    }
  };

  const handleEditUniv = async () => {
    if (
      logoError === "" &&
      locationError === "" &&
      nameError === "" &&
      websiteError === ""
    ) {
      let establishedYear = 0;
      let universityId = universityData.universityId;
      const updatedUniv = {
        universityId,
        name,
        location,
        imageUrl,
        website,
        establishedYear,
      };
      try {
        const response = await fetch(
          `${BASE_URL}/Universities/EditUniversity`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUniv),
          }
        );
        const isEdited = await response.json();
        if (isEdited === 0) {
          alert("didnt update");
          return;
        } else {
          console.log("Edit details successful");
          setUniversities((prevUniversities) =>
            prevUniversities.map((university) => {
              if (university.universityId === universityId) {
                return { ...university, ...updatedUniv }; // Merge the updated details into the existing course
              }
              return university;
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
          {isAddNew ? "הוסף מוסד לימוד" : "עריכת פרטים"}
        </h1>

        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="שם"
          color={"success"}
          variant="outlined"
          error={!!nameError}
          helperText={nameError}
          value={name}
          onChange={(e) => handleName(e.target.value)}
        />
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="מיקום"
          color={"success"}
          variant="outlined"
          value={location}
          error={!!locationError}
          helperText={locationError}
          onChange={(e) => handleLocation(e.target.value)}
        />
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="אתר"
          color={"success"}
          variant="outlined"
          value={website}
          error={!!websiteError}
          helperText={websiteError}
          onChange={(e) => handleWebsite(e.target.value)}
        />
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="לוגו"
          color={"success"}
          variant="outlined"
          value={imageUrl}
          error={!!logoError}
          helperText={logoError}
          onChange={(e) => handleLogo(e.target.value)}
        />

        <Button
          variant="outlined"
          color="success"
          onClick={isAddNew ? () => addUniversity() : () => handleEditUniv()}
        >
          {isAddNew ? "הוסף" : "עדכן"}
        </Button>
      </Box>
    </Modal>
  );
}

export default EditUniversitiesModal;
