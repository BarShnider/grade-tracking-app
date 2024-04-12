import TextField from "@mui/material/TextField";
import Button from "./Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useUniversities } from "../contexts/AppContext";
import { Link, NavLink, useNavigate } from "react-router-dom"


function LoginScreen() {
    const BASE_URL = `https://localhost:7204/api`;
    const { connectedUser, setConnectedUser } = useUniversities();
    const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  async function login() {
    try {
      const user = {
        Email: email, // Assuming your backend expects a Username field
        Password: password,  // Assuming your backend expects a Password field
      };
  
      const response = await fetch(`${BASE_URL}/User/Login`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      
      const data = await response.json(); // Or handle the response as needed
      if(data !== 0){
      console.log("Login successful", data);
      setConnectedUser(data)
      navigate('/universities'); // If using react-router-dom for navigation
      }
      else{
        alert("login failed, no user")
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
        sx={{ width: "80%" }}
        id="outlined-basic"
        label="שם משתמש"
        color={"success"}
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormControl sx={{ width: "80%", direction: "ltr" }} variant="outlined">
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          סיסמא
        </InputLabel>
        <OutlinedInput
          onChange={(e) => setPassword(e.target.value)}
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
      </FormControl>
      <Button onClick={() => login()}>התחבר</Button>
    </div>
  );
}

export default LoginScreen;
