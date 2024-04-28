import TextField from "@mui/material/TextField";
import Button from "./Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useUniversities } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import FormHelperText from '@mui/material/FormHelperText';


function LoginScreen() {
  const { connectedUser, setConnectedUser, BASE_URL } = useUniversities();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [guestLoginTrigger, setGuestLoginTrigger] = useState(false); // New state to manage guest login trigger

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      login();
    }
  };
  async function loginAsGuest() {
    setEmail("guest@mail.com")
    setPassword("guest")
    setGuestLoginTrigger(true); // Set trigger to true to initiate login in useEffect

  }

    // useEffect to watch for guest login trigger
    useEffect(() => {
      if (guestLoginTrigger) {
        login();
        setGuestLoginTrigger(false); // Reset trigger
      }
    }, [guestLoginTrigger]);

  async function login() {
    try {
      const user = {
        Email: email, // Assuming your backend expects a Username field
        Password: password, // Assuming your backend expects a Password field
        FirstName: "OptionalFirstName", // Add a default or form-controlled value
        LastName: "OptionalLastName", // Add a default or form-controlled value
      };

      const response = await fetch(`${BASE_URL}/User/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json(); // Or handle the response as needed
      if (data.id !== -1 && data.id !== -2) {
        console.log("Login successful", data);
        setConnectedUser(data);
        sessionStorage.setItem("connectedUser", JSON.stringify(data));
        navigate("/universities"); // If using react-router-dom for navigation
      } else {
        if (data.id === -1) {
          setEmailError("מייל לא קיים");
          setPasswordError("");
        } else {
          setEmailError("");
          setPasswordError("סיסמה שגויה");
        }
        //alert("login failed, no user")
      }
      // Here you might want to update your app context or perform a redirect, e.g.:
      //   setConnectedUser(data);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed"); // Consider a more user-friendly error handling
    }
  }
  return (
    <div className="login-form">
      <h1 className="login-header">התחברות</h1>
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="שם משתמש"
        color={"success"}
        variant="outlined"
        error={!!emailError}
        helperText={emailError}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <FormControl
        sx={{ width: "80%", direction: "ltr" }}
        variant="outlined"
        error={!!passwordError}
      >
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          סיסמא
        </InputLabel>
        <OutlinedInput
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}

          color="success"
          id="outlined-adornment-password"
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
          label="סיסמא"
        />
        <FormHelperText>{passwordError}</FormHelperText>
      </FormControl>

      <span>
        עדיין לא רשום?{" "}
        <span
          className="clickable logout-link"
          onClick={() => navigate("/register")}
        >
          הרשם עכשיו!
        </span>
      </span>
      <span className="clickable logout-link" onClick={() => loginAsGuest()}>
        התחבר כאורח
      </span>
      <Button onClick={() => login()}>התחבר</Button>
    </div>
  );
}

export default LoginScreen;
