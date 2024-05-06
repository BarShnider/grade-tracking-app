import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useUniversities } from "../contexts/AppContext";

function CourseComments() {
  const { selectedCourse,connectedUser, BASE_URL,notifyFail } = useUniversities();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("")
  const [commentTitle, setCommentTitle] = useState("כותרתתת")

  useEffect(function(){
    setCommentText("")
    setCommentTitle("כותרת")
    setCommentText("")
  },[selectedCourse])
  
  useEffect(
    function () {
      if (!selectedCourse) return;
      async function fetchComments() {
        try {
          const res = await fetch(
            `${BASE_URL}/Comments/GetAllCommentsByCourseId/${selectedCourse?.courseId}`
          );
          const data = await res.json();
          setComments(data);
        } catch (err) {
          console.log(err);
          notifyFail("there was an error loading data..");
        }
      }
      fetchComments();
    },
    [selectedCourse.courseId]
  );

  async function createComment() {
    try {
      let newComment = {
        CommenterId: connectedUser.id,
        Title: commentTitle,
        Text:commentText,
        whoCommented : connectedUser.email
      }
      // setIsLoading(true);
      const res = await fetch(`${BASE_URL}/Comments/CommentOnCourse/${selectedCourse?.courseId}`, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setComments(data);
      setCommentText("")
      console.log(data);
    } catch {
      notifyFail("there was an error creating comment..");
    } 
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      createComment();
    }
  }


  return (
    <div className="comments-container">
      {/* <div className="title-textbox-wrapper">
        <input className="title-textbox" type="text" placeholder="כתוב כותרת..." onChange={e => setCommentTitle(e.target.value)}  />
      </div> */}
      {connectedUser.email !== "guest@mail.com" && <div className="comment-form-wrapper">
        <textarea onChange={(e) => setCommentText(e.target.value)}
          className="comment text-area"
          onKeyDown={handleKeyDown}
          placeholder="כתוב את דעתך על הקורס..."
          value={commentText}
        ></textarea>
        <button className="small-btn send-btn" onClick={createComment}>
          <span style={{fontWeight:600,color:"#3c3c3c", fontFamily:"fredoka"}}>שלח</span>
        </button>
      </div>}
      {comments.length > 0 &&<svg height="1">
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#ceebdb"
          strokeWidth="0.9"
          style={{ width: "80%" }}
        />
      </svg>}
      {connectedUser.email === "guest@mail.com" && <span style={{color:"white", fontWeight:500}}>יש להיות משתמש רשום על מנת להגיב</span>}
      {comments.length === 0 && <span style={{color:"white", fontWeight:500}}>עדיין לא הגיבו על קורס זה...</span>}
      {comments.length === 0 && connectedUser.email !== "guest@mail.com" && <span style={{color:"white", fontWeight:500}}>בואו להגיב ראשונים!</span>}
      {comments.length > 0 && comments.map((comment) => (
        <Comment
          key={comment.commentId}
          commenterId={comment.commenterId}
          commentId={comment.commentId}
          title={comment.title}
          username={comment.whoCommented}
          text={comment.text}
          setComments={setComments}
        />
      ))}
    </div>
  );
}

export default CourseComments;
