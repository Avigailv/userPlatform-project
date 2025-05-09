import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import "../../../css/comment.css";
import "../../home"
import * as apiService from "../../../apiService.js";

function Comment({ comment, setComments }) {
    const currentUser = useOutletContext();
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [newBodyComment, setNewBodyComment] = useState(comment.body);

    // מחיקת תגובה
    async function handleDeleteComment(commentId) {
        if (!apiService.confirmAction("האם אתה בטוח שברצונך למחוק את תגובה?")) {
            return;
        }
        try {
            await apiService.deleteData(`comments/${commentId}`)
            setComments((prevComments) => prevComments.filter((c) => c.id !== comment.id));
        }
        catch (error) {
            alert(`שגיאה במחיקת התגובה`);
        }
    }

    // עדכון  תגובה
    async function handleUpdateComment(comment, newBodyComment) {
        if (!newBodyComment.trim()) {
            setNewBodyComment(comment.body);
            return;
        }
        const updatedComment = { body: newBodyComment };
        try {
            await apiService.UpdateData(`comments/${comment.id}`, updatedComment);
            setComments((prevComments) => prevComments.map(
                (c) => c.id === comment.id ? { ...c, ...updatedComment } : c));
        } catch (error) {
            alert(`שגיאה בעדכון התגובה: ${error.message}`);
        }
    }

    const handleUpdateCommentClick = () => {
        if (isEditingComment) {
            handleUpdateComment(comment, newBodyComment);  // קורא לפונקציה לעדכון כותרת
        }
        setIsEditingComment((prevState) => !prevState);  // משנה את המצב של עריכת הכותרת
    };

    return (
        <div className="comment-container">
            <p>{comment.id}</p>
            <strong>{comment.name}:</strong>
            <p> {comment.body}</p>
            <p><em>{comment.email}</em></p>

            {isEditingComment ?
                (<>
                    <textarea
                        type="text"
                        value={newBodyComment}
                        onChange={(e) => setNewBodyComment(e.target.value)}
                    />
                </>) : (<></>)
            }

            {comment.email == currentUser.email && (
                <>
                    <button onClick={handleUpdateCommentClick}>
                        {isEditingComment ? 'שמור' : 'ערוך תגובה'}
                    </button>
                    <button onClick={(e) => { handleDeleteComment(comment.id) }}> מחק תגובה</button>
                </>
            )}
        </div>
    );
}
export default Comment;