import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useUniversities } from '../contexts/AppContext';
const BASE_URL = `https://localhost:7204/api`;

function Comment({username,title,text,commenterId, commentId,setComments}) {
    const [isEditMode,setIsEditMode] = useState(false);
    const {connectedUser} = useUniversities()
    const [newText,setNewText] = useState("")


  async function deleteComment(commentID) {
    try {
      const res = await fetch(`${BASE_URL}/Comments/DeleteComment/${commentID}`, {
        method: "DELETE"
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete the comment');
      }
      setComments(currentComments => currentComments.filter(comment => comment.commentId !== commentID));
  
    } catch (error) {
      alert("There was an error deleting the comment.");
    }
  }
  
  async function updateComment(commentID, userID, editComment) {
    try {
      const response = await fetch(`${BASE_URL}/Comments?commentID=${commentID}&userID=${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( editComment )
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error('Failed to update the comment: ' + errorDetails);
      }
  
      const numEffected = await response.json(); // Assuming the server returns the number of updated records
  
      if (numEffected > 0) {
        // Update the comments state to reflect the change
        setComments(currentComments =>
          currentComments.map(comment =>
            comment.commentId === commentID ? { ...comment, text: editComment } : comment
          )
        );
        setIsEditMode(mode => !mode)
      } else {
        // Handle the case where the server did not update any records
        console.error("No comments were updated.");
      }
  
    } catch (error) {
      alert("There was an error updating the comment: " + error.message);
    }
  }
  



    return (
        <>
        <div className="comment">
            <div>
            <p className="comment-name">{username}</p>
            <h4 className="comment-title">{title}</h4>
            {!isEditMode? <span className="comment-text">{text}</span>: <textarea onChange={(e)=>setNewText(e.target.value) } defaultValue={text}></textarea>}
            </div>

        {connectedUser.id === commenterId && <div>
        <IconButton onClick={() => deleteComment(commentId)} aria-label="delete" color="secondery" size="small">
        <DeleteIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>


      {!isEditMode && <IconButton onClick={() => setIsEditMode((mode) => !mode)} aria-label="edit" color="secondery" size="small">
      <EditRoundedIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>}
      {isEditMode && <IconButton onClick={() => updateComment(commentId,connectedUser.id,newText)} aria-label="edit" color="secondery" size="small">
      <DoneIcon  sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>}


        {/* <IconButton onClick={() => setIsEditMode((mode) => !mode)} aria-label="edit" color="secondery" size="small">
        {!isEditMode && <EditRoundedIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />}
        {isEditMode && <DoneIcon onClick={() => updateComment(commentId,connectedUser.id,newText)} sx={{width:"20px",height:"20px", margin:"0px 5px"}} />}
      </IconButton> */}
        </div>}
        </div>
        </>
    )
}

export default Comment
