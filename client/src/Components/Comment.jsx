import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from 'react';
import { useUniversities } from '../contexts/AppContext';

function Comment({username,text,commenterId, commentId,setComments}) {
    const [isEditMode,setIsEditMode] = useState(false);
    const {connectedUser, BASE_URL,notifyFail} = useUniversities()
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
      notifyFail("There was an error deleting the comment.");
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
      }
  
    } catch (error) {
      notifyFail("התרחשה שגיאה בעת עדכון התגובה");
    }
  }
  



    return (
        <>
        <div className="comment">
            <div>
            <p className="comment-name">{username.split("@")[0]}</p>
            {!isEditMode? <span className="comment-text">{text}</span>: <textarea style={{width:"80%"}} onChange={(e)=>setNewText(e.target.value) } defaultValue={text}></textarea>}
            </div>
        {connectedUser.id === commenterId && <div>
        <IconButton sx={{width:"30px",height:"30px"}} onClick={() => deleteComment(commentId)} aria-label="delete" color="secondery" size="small">
        <DeleteIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>
      {!isEditMode && <IconButton sx={{width:"30px",height:"30px"}} onClick={() => setIsEditMode((mode) => !mode)} aria-label="edit" color="secondery" size="small">
      <EditRoundedIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>}
      {isEditMode && <IconButton sx={{width:"30px",height:"30px"}} onClick={() => updateComment(commentId,connectedUser.id,newText)} aria-label="edit" color="secondery" size="small">
      <DoneIcon  sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>}
        </div>}
        </div>
        </>
    )
}

export default Comment
