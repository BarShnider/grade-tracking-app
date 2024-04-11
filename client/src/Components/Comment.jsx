import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useState } from 'react';
function Comment({username,title,text,commenterId}) {
    const [isEditMode,setIsEditMode] = useState(false);


    console.log(commenterId)
  async function createComment() {
    try {
      let newComment = {
        CommenterId: commentWriter,
        Title: commentTitle,
        Text:commentText,
        whoCommented : "אנונימייייי"
      }
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/Comments/CommentOnCourse/${selectedCourse?.courseId}`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setComments(data);
      console.log(data);
    } catch {
      alert("there was an error creating comment..");
    } finally {
      // setIsLoading(false);
    }
  }

    function deleteComment(){

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
        <IconButton aria-label="delete" color="secondery" size="small">
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
