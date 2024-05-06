import TextField from "@mui/material/TextField";
import Button from "./Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";
import FormHelperText from "@mui/material/FormHelperText";
import emailjs from "@emailjs/browser";

export default function ForgotPassModal() {
  const { BASE_URL, notifySuccess, notifyFail } = useUniversities();
  const [mail, setMail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [randomNumber, setRandomNumber] = useState();

  const regexPatternPassword =
    /^(?=.*[!@#$%^&*()_+{}|:"<>?])(?=.*[A-Z])(?=.*\d).{7,12}$/;

  const handleInputChange = (
    event,
    setter,
    regexPattern,
    errorSetter,
    errorMessage
  ) => {
    const newValue = event.target.value;
    setter(newValue);
    if (!regexPattern.test(newValue)) {
      errorSetter(errorMessage);
    } else {
      errorSetter("");
    }
  };

  async function sendEmailCheck() {
    if (mail !== "" && errorMail === "") {
      try {
        // Fetch user data to check if email is already registered
        const response = await fetch(`${BASE_URL}/User/${mail}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const isRegistered = await response.json(); // Expecting a boolean response

        if (isRegistered === 1) {
          const random = Math.floor(Math.random() * 9000) + 1000;
          setRandomNumber(random);
          sendMessageEmail(random);
          return;
        } else {
          setErrorMail("משתמש לא קיים");
        }
      } catch (error) {
        console.error("error:", error);
        notifyFail("Registration failed"); // Notify user of failure
      }
    }
  }
  const sendMessageEmail = (random) => {
    const templateParams = {
      to_email: mail, // Ensure your email template is configured to use `to_email`
      to_name: firstName,
      message: `Your code is ${random}`,
    };

    emailjs
      .send(
        "service_52qy1iu",
        "template_wb2vw9k",
        templateParams,
        "pSgdrQdjEFDnz7Dx4"
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setIsCodeModalOpen(true);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <div className="login-form">
      <h1 className="login-header">שכחתי סיסמה</h1>
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        label="אימייל"
        variant="outlined"
        color="success"
        value={mail}
        onChange={(e) =>
          handleInputChange(
            e,
            setMail,
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            setErrorMail,
            "כתובת אימייל לא חוקית."
          )
        }
        error={!!errorMail}
        helperText={errorMail}
      />
      <Button>שלח הודעה</Button>
    </div>
  );
}
