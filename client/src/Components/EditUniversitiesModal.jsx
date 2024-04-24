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
}) {
  const handleClose = () => setIsUniversitiesModalOpen(false);
  const { BASE_URL } = useUniversities();
  const navigate = useNavigate();

  const [universityId, setUniversityId] = useState(universityData.universityId);
  const [name, setName] = useState(universityData.name);
  const [location, setLocatin] = useState(universityData.location);
  const [website, setWebsite] = useState(universityData.website);
  const [imageUrl, setImageUrl] = useState(universityData.imageUrl);
  useEffect(() => {}, [name, location, imageUrl, website]);

  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [logoError, setLogoError] = useState("");

  const handleName = (name) => {
    setName(name);
    if (name === "") {
      setNameError("שדה חובה*");
    } else {
      setNameError("");
    }
  };

  const handleLocation = (location) => {
    setLocatin(location);
    if (location === "") {
      setLocationError("שדה חובה*");
      return 0;
    } else {
      setLocationError("");
      return 1;
    }
  };

  const handleWebsite = (website) => {
    setWebsite(website);
    if (website === "") {
      setWebsiteError("שדה חובה*");
      return 0;
    } else {
      setWebsiteError("");
      return 1;
    }
  };

  const handleLogo = (logo) => {
    setImageUrl(logo);
    if (logo === "") {
      setLogoError("שדה חובה*");
      return 0;
    } else {
      setLogoError("");
      return 1;
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
      const univ = {
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
            body: JSON.stringify(univ),
          }
        );
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
          onClick={() => handleEditUniv()}
        >
          עדכן
        </Button>
      </Box>
    </Modal>
  );
}

export default EditUniversitiesModal;
