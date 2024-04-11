import TextField from '@mui/material/TextField';
import Button from './Button';


function LoginScreen() {
    
    return (
        <div className='login-form'>
            <h1>התחברות</h1>
          <TextField  sx={{width:"80%"}}  id="outlined-basic" label="שם משתמש" color={"success"} variant="outlined" />
          <TextField  sx={{width:"80%"}}  id="outlined-basic" label="סיסמא" color={"success"} variant="outlined" />
          <Button >התחברות</Button>
              
        </div>
    )
}

export default LoginScreen
