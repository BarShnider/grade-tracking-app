import TextField from "@mui/material/TextField";
import Button from "./Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUniversities } from "../contexts/AppContext";
import FormHelperText from "@mui/material/FormHelperText";
import emailjs from "@emailjs/browser";
import ValidateRegisterCodeModal from "./ValidateRegisterCodeModal";

export default function ForgotPassModal() {
  const { BASE_URL, notifySuccess, notifyFail, } = useUniversities();
  const [mail, setMail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [randomNumber, setRandomNumber] = useState();
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)
  const [isCodeAprroved, setIsCodeApproved] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


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
          setIsCodeModalOpen(true)
          return;
        } else {
          setErrorMail("משתמש לא קיים");
        }
      } catch (error) {
        notifyFail("התרחשה שגיאה"); // Notify user of failure
      }
    }
  }

  const updatePassword = async () => {
    if (isCodeAprroved) {
      try {
        const response = await fetch(`${BASE_URL}/User/UserForgotPass/${mail}/${password}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // No need to send additional user data since the controller only expects email and password
          // body: JSON.stringify(user),
        });
  
        // Assuming the response is the status code returned by the controller
        const statusCode = await response.json();
  
        // Assuming the controller returns 1 on success
        if (statusCode === 1) {
          notifySuccess(`${mail} עודכן בהצלחה!`);
          notifySuccess(`יש להתחבר מחדש`);
          navigate("/login")
        } else {
          notifyFail("עדכון הסיסמא נכשל");

        }
      } catch (error) {
        notifyFail("עדכון הסיסמא נכשל");
      } 
    }
  };
  
  const sendMessageEmail = (random) => {
    const templateParams = {
      to_email: mail, // Ensure your email template is configured to use `to_email`
      to_name: mail,
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
          notifySuccess("המייל נשלח");
          setIsCodeModalOpen(true);
        },
        (error) => {
          notifyFail("שגיאה בעת שליחת המייל");
        }
      );
  };

  return (
    <>
    
    {isCodeModalOpen && (
      <ValidateRegisterCodeModal
      setIsCodeApproved={setIsCodeApproved}
        validationCode={randomNumber}
        isOpen={isCodeModalOpen}
        setIsCodeModalOpen={setIsCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    )}
    <div className="login-form">
      <h1 className="login-header">שכחתי סיסמה</h1>
      {!isCodeAprroved && <><TextField
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
      <Button onClick={() =>sendEmailCheck()}>שלח מייל לאימות</Button></>}
      {isCodeAprroved && <> <FormControl
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
      <Button onClick={() => updatePassword()}>החלף סיסמא</Button></>}
    <span
          className="clickable logout-link"
          onClick={() => navigate("/login")}
        >
          חזרה למסך התחברות
        </span>
    </div>
    </>
  );
}
