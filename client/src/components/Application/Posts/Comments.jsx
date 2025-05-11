import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import * as apiService from "../../../apiService.js";
import Comment from "./comment";
import "../../../css/comment.css";

function Comments({ postId }) {
  const currentUser = useOutletContext();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", body: "" });
  const [showComments, setShowComments] = useState(false); // סטייט עבור הצגת התגובות
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  async function fetchComments(postId) {
    try {
      const data = await apiService.fetchData(`comments?post_id=${postId}`);
      setComments(data);
      setShowComments(true); 
    } catch (error) {
      alert("שגיאה בשליפת התגובות");
    }
  }

  //הוספת Comment
  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.body.trim()) {
      alert("שם ותוכן התגובה הם שדות חובה.");
      return;
    }
    const newCommentData = {
      post_id: postId,
      name: newComment.name.trim(),
      email: currentUser.email,
      body: newComment.body.trim(),
    };
    try {
      const createdComment = await apiService.addData(`comments`, newCommentData)
      setComments((prevComments) => [...prevComments, createdComment]); // עדכון רשימת הפוסטים
      setNewComment({ name: "", body: "" });
      setIsAddingComment(false); // סגירת הטופס
    }
    catch (error) {
      alert(`שגיאה בהוספת תגובה`);
    }
  }

  // פונקציה לטיפול בלחיצה על כפתור "הוסף תגובה"
  const handleToggleAddComment = () => {
    setIsAddingComment((prevState) => !prevState);
  };

  return (
    <div className="comments-container">
      <button onClick={handleToggleAddComment}>
        {isAddingComment ? "בטל תגובה" : "הוסף תגובה"}
      </button>

      {isAddingComment && (
        <form onSubmit={handleAddComment} className="comment-form">
          <input
            type="text"
            placeholder="שם"
            value={newComment.name}
            onChange={(e) => { setNewComment({ ...newComment, name: e.target.value }) }}
            required
          />
          <textarea
            placeholder="תוכן התגובה"
            value={newComment.body}
            onChange={(e) => { setNewComment({ ...newComment, body: e.target.value }) }}
            required
          ></textarea>
          <button type="submit">שמור תגובה</button>
        </form>
      )}

      {showComments && (
        <div className="comments-section">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} setComments={setComments} />
            ))
          ) : (
            <p>אין תגובות להצגה.</p>
          )}
        </div>
      )}

    </div>
  );
}
export default Comments;