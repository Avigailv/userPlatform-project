import query from './query.js';

export const getAllTodos = async () => {
  try {
    let rows = await query.getQuery('todos');
    console.log("rows", rows);
    return rows;
  } catch (error) {
    console.log("errorintodos");
    throw new Error('שגיאה בשאילתת נתונים');
  }
}

export const addTodo = async (newTodo) => {
  try {
    let result = await query.insertQuery(
      "todos", newTodo
    );
    return result.insertId;
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
};

export const updateTodo = async (todo,id) => {
  try {
    let result = await query.updateQuery(
      "todos", todo,`id=${id}`
    );
    return result.affectedRows;
  } catch (error) {
    console.log("erroratadd");
    //  throw new Error('שגיאה בהוספת נתונים');
  }
}

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


// const run = async () => {
//   const todos = await getAllTodos();
//   console.log("todos:", todos);
// };


// const run = async () => {
//   const newTodo = {
//     user_id: 1,
//     title: "לסיים את קוד השרת",
//     completed: 0
//   };

//   const todos = await addTodo(newTodo);
// console.log("New todo inserted:", todos);
// };


// const run = async () => {
//   const updatedTodo = {
//     title:  "לסיים הכלללללללללל",
//     completed: 1
//   };

//   const id = 10; // שימי כאן את ה-id של המשימה שברצונך לעדכן

//   await updateTodo( updatedTodo,id);
//   console.log(`Todo with ID ${id} updated.`);
// };

