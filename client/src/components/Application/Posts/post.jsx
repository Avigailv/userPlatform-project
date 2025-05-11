import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Comments from "./Comments";
import "../../../css/post.css";
import * as apiService from "../../../apiService.js";

function Post({ post, setPosts }) {
  const currentUser = useOutletContext();
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [expandedView, setExpandedView] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [showComments, setShowComments] = useState(false); // סטייט עבור הצגת התגובות

  // מחיקת פוסט
  async function handleDeletePost(postId) {
    if (!apiService.confirmAction("האם אתה בטוח שברצונך למחוק את הפוסט??")) {
      return;
    }
    try {
      const comments = await apiService.fetchData(`comments?post_id=${postId}`);
      comments.forEach(comment => {
        apiService.deleteData(`comments/${comment.id}`)
      });
      await apiService.deleteData(`posts/${postId}`)
      setPosts((prevPosts) => prevPosts.filter((t) => t.id !== postId));
    }
    catch (error) {
      alert(`שגיאה במחיקת הפוסט`);
    }
  }

  // עדכון פוסט
  async function handleUpdatePost(postId, newBody) {
    if (!newBody.trim()) {
      setNewBody(post.body);
      return;
    }
    const updatedPost = {
      body: newBody
    };
    try {
      await apiService.UpdateData(`posts/${postId}`, updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((t) => (t.id === postId ? { ...t, ...updatedPost } : t))
      );
    }
    catch (error) {
      alert(`שגיאה בעדכון פוסט`);
    }
  }

  const handleUpdateClick = () => {
    if (isEditingPost) {
      handleUpdatePost(post.id, newBody);  // קורא לפונקציה לעדכון כותרת
    }
    setIsEditingPost((prevState) => !prevState);  // משנה את המצב של עריכת הכותרת
  };

  // משנה את המצב בין פתוח לסגור
  const handleSwitchStatePost = () => {
    setExpandedView((prev) => !prev);
  };

  function handleViewComments() {
    setShowComments((prevState) => !prevState);
  }

  return (
    <div className="post-container" onClick={handleSwitchStatePost}>

      <p>id:{post.id}</p>
      <p>{post.title}</p>

      {expandedView && (
        <div className="post-details" onClick={(e) => e.stopPropagation()}>
          <p>{post.body}</p>

          {post.user_id == currentUser.id && (
            <div className="button-group">
              <button onClick={() => { handleDeletePost(post.id) }}>מחיקה</button>
              <button onClick={(event) => { handleUpdateClick(event) }}>
                {isEditingPost ? 'שמור' : 'עידכון'}
              </button>
            </div>
          )}

          {isEditingPost ?
            (<>
              <textarea
                value={newBody}
                onChange={(e) => { setNewBody(e.target.value) }}
                rows="5"
                cols="50"
              />
            </>) : null}
          <div className="button-group">

            <button className="comments-button"
              onClick={() => { handleViewComments() }}>
              {showComments ? "הסתר תגובות" : "הצגת כל התגובות"}
            </button>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            {showComments &&
              <Comments postId={post.id} />
            }
          </div>
        </div>
      )}
    </div >
  );
}
export default Post;