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

function EditDetails() {
  const BASE_URL = `https://localhost:7204/api`;
  const [showPassword, setShowPassword] = useState(false);
  const { connectedUser, setConnectedUser } = useUniversities();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [secondPasswordError, setSecondPasswordError] = useState("");

  const [id, setId] = useState();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const hebrewRegex = /^[\u0590-\u05FF\s]+$/;
  const regexPatternPassword =
    /^(?=.*[!@#$%^&*()_+{}|:"<>?])(?=.*[A-Z])(?=.*\d).{7,12}$/;

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (connectedUser) {
      setId(connectedUser.id);
      setEmail(connectedUser.email);
      setFirstName(connectedUser.firstName);
      setLastName(connectedUser.lastName);
    } else {
      console.log("User data is not loaded yet");
    }
  }, [connectedUser]);

  const handleFirstName = (word) => {
    console.log(id);
    setFirstName(word);
    if (hebrewRegex.test(word) || word === "") {
      setFirstNameError("");
    } else {
      setFirstNameError("נא להכניס רק אותיות בעברית ");
    }
  };

  const handleLastName = (word) => {
    setLastName(word);
    if (hebrewRegex.test(word) || word === "") {
      setLastNameError("");
    } else {
      setLastNameError("נא להכניס רק אותיות בעברית ");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (password !== "") {
      if (!regexPatternPassword.test(event.target.value)) {
        setPasswordError(
          "הסיסמה חייבת להכיל בין 7 ל-12 תווים. יש לוודא שיש לפחות תו אחד מיוחד, אות גדולה ומספר"
        );
      } else {
        setPasswordError("");
      }
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmit = async () => {
    if (password !== secondPassword) {
      setSecondPasswordError("סיסמאות אינן דומות");
    } else {
      setSecondPasswordError("");
    }
    if (email === "") {
      setEmailError("שדה חובה*");
    } else if (emailRegex.test(email)) {
      setEmailError("");
    } else {
      setEmailError("נא להכניס מייל בפורמט הבא example@example.com");
    }
    if (firstName === "") {
      setFirstNameError("שדה חובה*");
    }
    if (lastName === "") {
      setLastNameError("שדה חובה*");
    }
    if (
      emailError === "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      passwordError === "" &&
      secondPasswordError === ""
    ) {
      const user = {
        id,
        email,
        firstName,
        lastName,
        password,
      };
      try {
        const response = await fetch(`${BASE_URL}/User/EditUser`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const isEdited = await response.json();
        if (isEdited === 0) {
          setEmailError("אימייל תפוס, נסו אימייל אחר");
          return;
        } else {
          user.password = "";
          setConnectedUser(user);
          sessionStorage.setItem("connectedUser", JSON.stringify(user));
        }
        console.log("Edit details successful");
        navigate("/universities");
      } catch (error) {
        console.error("Edit error:", error);
        alert("Edit failed"); // Consider a more user-friendly error handling
      }
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (!connectedUser) {
    console.log("Connected user not found, redirecting or waiting...");
    return <div>Loading user details...</div>;
  }
  //////////////////// DO WE NEED THIS HERE ???????????

  return (
    <div className="login-form">
      <h1 className="login-header">עריכת פרטים</h1>

      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="אימייל"
        color={"success"}
        variant="outlined"
        value={email}
        error={!!emailError}
        helperText={emailError}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="שם פרטי"
        color={"success"}
        variant="outlined"
        value={firstName}
        error={!!firstNameError}
        helperText={firstNameError}
        onChange={(e) => handleFirstName(e.target.value)}
      />

      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="שם משפחה"
        color={"success"}
        variant="outlined"
        value={lastName}
        error={!!lastNameError}
        helperText={lastNameError}
        onChange={(e) => handleLastName(e.target.value)}
      />

      <FormControl
        sx={{ width: "80%", direction: "ltr" }}
        variant="outlined"
        error={!!passwordError}
      >
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          סיסמה חדשה (עדכן אם יש צורך)
        </InputLabel>
        <OutlinedInput
          color="success"
          id="outlined-adornment-password"
          onBlur={handlePasswordChange}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setSecondPassword(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="אימות סיסמה חדשה"
        />
        <FormHelperText>{passwordError}</FormHelperText>
      </FormControl>
      {/* <FormControl
        sx={{ width: "80%", direction: "ltr" }}
        variant="outlined"
        error={!!seccondPasswordError}
      >
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          סיסמה חדשה (עדכן אם יש צורך)
        </InputLabel>
        <OutlinedInput
          color="success"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => handlePasswordChange(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="סיסמה חדשה (עדכן אם יש צורך)"
        />
        <FormHelperText>{passwordError}</FormHelperText>
      </FormControl> */}

      <FormControl
        sx={{ width: "80%", direction: "ltr" }}
        variant="outlined"
        error={!!secondPasswordError}
      >
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          אימות סיסמא חדשה
        </InputLabel>
        <OutlinedInput
          color="success"
          id="outlined-adornment-password"
          onChange={(e) => setSecondPassword(e.target.value)}
          //onBlur={handleSecondPass}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="אימות סיסמה חדשה"
        />
        <FormHelperText>{secondPasswordError}</FormHelperText>
      </FormControl>
      <Button onClick={() => handleSubmit()}>עדכן</Button>
    </div>
  );
}

export default EditDetails;
