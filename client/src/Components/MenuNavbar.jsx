import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUniversities } from '../contexts/AppContext';
import {useNavigate } from "react-router-dom"

export default function MenuNavbar() {
    const [open, setOpen] = React.useState(false);
    const {connectedUser, setConnectedUser} = useUniversities();
    const anchorRef = React.useRef(null);
    const navigate = useNavigate();
    function logout(){
        setConnectedUser(null)
        navigate("/login")
        
      }
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    // const handleClose = (event) => {
    //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //       logout();
    //     return;
    //   }
    //   setOpen(false);
    // };

    const handleClose = (event) => {
      // Close the dropdown if the click is outside the anchor element (button)
      if (anchorRef.current && !anchorRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    const handleEditDetails = (e) => {
      navigate("/edit");
      handleClose(e);
  };


    const onLogoutClick = (event) => {
        logout()
        handleClose(event);
    }
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  return (
    <Stack sx={{position:"absolute", top:"20px",right:"20px"}} direction="row" spacing={2}>

    <div>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{color:"#fff", fontWeight:"600",textTransform:"none", border:"1px solid #fff"}}
      >
        {connectedUser.firstName + " " + connectedUser.lastName}&nbsp;<AccountCircleIcon />

      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {connectedUser.email !== "guest@mail.com" && <MenuItem onClick={(e) => handleEditDetails(e)}>עריכת פרטים</MenuItem>}
                  <MenuItem onClick={(e) => onLogoutClick(e)}>התנתק</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  </Stack>
  );
}