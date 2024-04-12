import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useState } from 'react';
const BASE_URL = `https://localhost:7204/api`;

function Comment({username,title,text,commenterId, commentId,setComments}) {
    const [isEditMode,setIsEditMode] = useState(false);



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
  


    return (
        <>
        <div className="comment">
            <div>
            <p className="comment-name">{username}</p>
            <h4 className="comment-title">{title}</h4>
            {!isEditMode? <span className="comment-text">{text}</span>: <textarea>{text}</textarea>}
            </div>
        <div>
        <IconButton onClick={() => deleteComment(commentId)} aria-label="delete" color="secondery" size="small">
        <DeleteIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>
        <IconButton onClick={() => setIsEditMode((mode) => !mode)} aria-label="edit" color="secondery" size="small">
        <EditRoundedIcon sx={{width:"20px",height:"20px", margin:"0px 5px"}} />
      </IconButton>
        </div>
        </div>
        </>
    )
}

export default Comment
