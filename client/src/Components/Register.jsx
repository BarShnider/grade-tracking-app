import TextField from "@mui/material/TextField";
import Button from "./Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";
import emailjs from "@emailjs/browser";

function Register() {
  const { BASE_URL } = useUniversities();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();
  const regexPatternHebrew = /^[\u0590-\u05FF]+$/; // Hebrew characters pattern
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

  const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);
    if (!regexPatternPassword.test(newValue)) {
      setPasswordError(
        "הסיסמה חייבת להכיל בין 7 ל-12 תווים. יש לוודא שיש לפחות תו אחד מיוחד, אות גדולה ומספר"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newValue = event.target.value;
    setConfirmPassword(newValue);
    if (newValue !== password) {
      setConfirmPasswordError("הסיסמאות אינן זהות");
    } else {
      setConfirmPasswordError("");
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Resetting errors before checking
    setEmailError("");
    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Check for empty fields and set errors accordingly
    if (!email) setEmailError("נא להזין אימייל");
    if (!firstName) setFirstNameError("נא להזין שם פרטי");
    if (!lastName) setLastNameError("נא להזין שם משפחה");
    if (!password) setPasswordError("נא להזין סיסמא");
    if (!confirmPassword) setConfirmPasswordError("נא להזין אימות סיסמא");

    // Check for any existing errors
    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      emailError ||
      firstNameError ||
      lastNameError ||
      passwordError ||
      confirmPasswordError
    ) {
      console.error("Form validation failed.");
      return; // Stop submission if there are any errors
    }

    console.log("Submitting form...");
    sendEmail(); // Call sendEmail here, it doesn't take event as an argument now

    // const user = {
    //   email,
    //   firstName,
    //   lastName,
    //   password,
    // };

    // try {
    //   const response = await fetch(`${BASE_URL}/User/Register`, {
    //     method: "POST", // Corrected typo in method
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user),
    //   });

    //   const isRegistered = await response.json(); // Expecting a boolean response
    //   if (!isRegistered) {
    //     setEmailError("האימייל תפוס, נסו אימייל אחר");
    //     return;
    //   }

    //   console.log("Registration successful");
    //   navigate("/login"); // Navigate to login or success page
    // } catch (error) {
    //   console.error("Registration error:", error);
    //   alert("Registration failed"); // Consider a more user-friendly error handling
    // }
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: email, // Ensure your email template is configured to use `to_email`
      to_name: firstName,
      message: "Your code is 123456789",
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
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <div className="login-form">
      <h1 className="login-header">הרשמה</h1>
      <span>
        יש לך כבר משתמש?{" "}
        <span
          className="clickable logout-link"
          onClick={() => navigate("/login")}
        >
          התחבר עכשיו!
        </span>
      </span>
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        label="אימייל"
        variant="outlined"
        color="success"
        value={email}
        onChange={(e) =>
          handleInputChange(
            e,
            setEmail,
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            setEmailError,
            "כתובת אימייל לא חוקית."
          )
        }
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        label="שם פרטי"
        color="success"
        variant="outlined"
        value={firstName}
        onChange={(e) =>
          handleInputChange(
            e,
            setFirstName,
            regexPatternHebrew,
            setFirstNameError,
            "יש להזין אותיות בעברית בלבד."
          )
        }
        error={!!firstNameError}
        helperText={firstNameError}
      />
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        label="שם משפחה"
        variant="outlined"
        color="success"
        value={lastName}
        onChange={(e) =>
          handleInputChange(
            e,
            setLastName,
            regexPatternHebrew,
            setLastNameError,
            "יש להזין אותיות בעברית בלבד."
          )
        }
        error={!!lastNameError}
        helperText={lastNameError}
      />
      <FormControl
        error={!!passwordError}
        sx={{ width: "80%", direction: "ltr" }}
        variant="outlined"
      >
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          סיסמא
        </InputLabel>
        <OutlinedInput
          value={password}
          onChange={handlePasswordChange}
          color="success"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="סיסמא"
        />
        <FormHelperText>{passwordError}</FormHelperText>
      </FormControl>

      <FormControl
        error={!!confirmPasswordError}
        sx={{ width: "80%", direction: "ltr" }}
        variant="outlined"
      >
        <InputLabel color="success" htmlFor="confirm-password">
          אימות סיסמא
        </InputLabel>
        <OutlinedInput
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type={showPassword ? "text" : "password"}
          color="success"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(event) => event.preventDefault()}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="אימות סיסמא"
        />
        <FormHelperText>{confirmPasswordError}</FormHelperText>
      </FormControl>
      <Button onClick={(e) => handleSubmit(e)}>הרשמה</Button>
    </div>
  );
}

export default Register;
