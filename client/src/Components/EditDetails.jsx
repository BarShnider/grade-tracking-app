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
import {useNavigate} from "react-router-dom"
import { useUniversities } from "../contexts/AppContext";

function EditDetails() {
    const [showPassword, setShowPassword] = useState(false);
    const {connectedUser} = useUniversities();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate();
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    if (!connectedUser) {
        console.log("Connected user not found, redirecting or waiting...");
        // Optional: Redirect or show a loading indicator
        return <div>Loading user details...</div>; // or redirect: navigate('/login');
    }
  return (
    <div className="login-form">
      <h1 className="login-header">עריכת פרטים</h1>

      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="שם משתמש"
        color={"success"}
        variant="outlined"
        value={connectedUser.email}

      />
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="שם פרטי"
        color={"success"}
        variant="outlined"
        value={connectedUser.firstName}
      />
      <TextField
        sx={{ width: "80%", direction: "ltr" }}
        id="outlined-basic"
        label="שם משפחה"
        color={"success"}
        variant="outlined"
        value={connectedUser.lastName}

      />
      <FormControl sx={{ width: "80%", direction: "ltr" }} variant="outlined">
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          סיסמא
        </InputLabel>
        <OutlinedInput
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
      <FormControl sx={{ width: "80%", direction: "ltr" }} variant="outlined">
        <InputLabel color="success" htmlFor="outlined-adornment-password">
          אימות סיסמא
        </InputLabel>
        <OutlinedInput
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
          label="אימות סיסמא"
        />
      </FormControl>
      <Button>התחברות</Button>
    </div>
  );
}

export default EditDetails;
