import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SmallButton from './SmallButton';

function ModalAddUniversity() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#a9c3b6',
        border: '2px solid #ceebdb',
        borderRadius: '15px',
        boxShadow: 24,
        p: 4,
        textAlign:'center'
      };
      
    return (
      <div>
        <SmallButton onClick={handleOpen}>+</SmallButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              הוסף אוניברסיטה חדשה
            </Typography>
            <div style={{display:'flex',justifyContent:'center', alignItems:'center', flexDirection:'column'}}>

            <input onChange={(e) => console.log(e.target.value)} className='modal-textbox' type="text" placeholder='שם' />
            <input onChange={(e) => console.log(e.target.value)} className='modal-textbox' type="text" placeholder='עיר' />
            <input onChange={(e) => console.log(e.target.value)} className='modal-textbox' type="text" placeholder='שנה' />
            <input onChange={(e) => console.log(e.target.value)} className='modal-textbox' type="text" placeholder='כתובת אתר' />
            <input onChange={(e) => console.log(e.target.value)} className='modal-textbox' type="text" placeholder='כתובת תמונה' />
            <SmallButton style={{padding:'5px', border: '1px solid grey',fontWeight:'600',color:'grey',boxShadow: 'rgb(34 34 34 / 33%) 2px 3px 4px 0px'}}>הוסף</SmallButton>
            </div>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}
          </Box>
        </Modal>
      </div>
    );
}

export default ModalAddUniversity
