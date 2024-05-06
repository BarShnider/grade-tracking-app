import "react-circular-progressbar/dist/styles.css";
import "animate.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";

function ValidateRegisterCodeModal({
    validationCode,
  isOpen,
  setIsCodeModalOpen,
  setIsCodeApproved
}) {
  const handleClose = () => setIsCodeModalOpen(false);
  const [validation, setValidation] = useState("")

  const handleSubmit = () => {
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
        <h1 className="login-header">הזן קוד אימות</h1>
        <TextField
          sx={{ width: "80%", direction: "ltr" }}
          id="outlined-basic"
          label="קוד אימות"
          color={"success"}
          variant="outlined"
          value={validation}
          onChange={(e) => setValidation(e.target.value)}
        />

        <Button
          onClick={() => handleSubmit()}
          variant="outlined"
          color="success"
        >
          שלח
        </Button>
      </Box>
    </Modal>
  );
}

export default ValidateRegisterCodeModal;
