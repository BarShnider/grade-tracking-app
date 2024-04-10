import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useUniversities } from "../contexts/AppContext";
const BASE_URL = `https://localhost:7204/api`;

function CourseComments() {
  const { selectedCourse, setIsLoading, isLoading } = useUniversities();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("")
  const [commentTitle, setCommentTitle] = useState("כותרתתת")
  const [commentWriter,setCommentWriter] = useState(1)
  // console.log(selectedCourse);

  useEffect(function(){
    setCommentText("")
    setCommentTitle("כותרת")
    setCommentText("")
    // setCommentText("")
  },[selectedCourse])
  
  useEffect(
    function () {
      if (!selectedCourse) return;
      async function fetchComments() {
        try {
          // setIsLoading(true);
          const res = await fetch(
            `${BASE_URL}/Comments/GetAllCommentsByCourseId/${selectedCourse?.courseId}`
          );
          const data = await res.json();
          setComments(data);
          // console.log(data);
          // console.log(comments);
        } catch (err) {
          console.log(err);
          alert("there was an error loading data..");
        } finally {
          // setIsLoading(false);
        }
      }
      fetchComments();
    },
    [selectedCourse.courseId]
  );

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


  return (
    <div className="comments-container">
      <div className="title-textbox-wrapper">
        <input className="title-textbox" type="text" placeholder="כתוב כותרת..." onChange={e => setCommentTitle(e.target.value)}  />
      </div>
      <div className="comment-form-wrapper">
        <textarea onChange={(e) => setCommentText(e.target.value)}
          className="comment text-area"
          placeholder="כתוב תגובה..."
        ></textarea>
        <button className="small-btn send-btn" onClick={createComment}>
          <span>שלח</span>
        </button>
      </div>
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
      {comments.map((comment) => (
        <Comment
          title={comment.title}
          username={comment.whoCommented}
          text={comment.text}
        />
      ))}
      {/* <Comment />
            <Comment />
            <Comment /> */}
    </div>
  );
}

export default CourseComments;
