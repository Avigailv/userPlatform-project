import query from './query.js';

export const deleteTodo = async (id) => {
  try {
    let result = await query.deleteQuery("todos", `id=${id}`);
    console.log("מחיקה הצליחה:", result);
    return result;
  } catch (error) {
    console.error("שגיאה במחיקת המשימה:", error.message);
    throw new Error('שגיאה במחיקת הנתונים');
  }
}