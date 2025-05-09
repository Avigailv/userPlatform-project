import query from './query.js';
// console.log("comment.services");


// פונקציה לשליפת כל המשתמשים
export const getAllComment = async () => {
    try {
        let rows = await query.getQuery('comments');
        console.log("rows", rows);
        return rows;
    } catch (error) {
        console.log("errorInCommentServices");
        // throw new Error('שגיאה בשאילתת נתונים');
    }
};

export const addComment = async (newComment) => {
    try {

        let result = await query.insertQuery(
            "comments", newComment
        );
        return result;
    } catch (error) {
        console.log("errorInAddComment");
        //  throw new Error('שגיאה בהוספת נתונים');
    }

};
export const deleteComment = async (id) => {
    try {
        let result = await query.deleteQuery("comments", `id=${id}`);
        console.log("מחיקה הצליחה:", result);
        return result;
    } catch (error) {
        console.error("שגיאה במחיקת המשימה:", error.message);
        throw new Error('שגיאה במחיקת הנתונים');
    }
}
export const updateComment = async (comment,id) => {
    try {
        let result = await query.updateQuery(
            "comments", comment, `id=${id}`);
        return result;
    } catch (error) {
        console.log("errorInUpdateComment");
        //  throw new Error('שגיאה בהוספת נתונים');
    }
}





const run = async () => {
  const updated = {
    id: 1,
    name: "יוסי כהן",
    email: "yossi@example.com",
    body: "עריכת תגובה",
  };

  const id = 2; // שימי כאן את ה-id של המשימה שברצונך לעדכן

  await updateComment(updated, id);
  console.log(`Post with ID ${id} updated.`);
};
// run();