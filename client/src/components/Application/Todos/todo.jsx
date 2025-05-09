import React, { useState } from "react";
import "../../../css/todo.css";
import * as apiService from "../../../apiService.js";

function Todo({ todo, setTodos }) {
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  // עדכון סטטוס משימה
  function handleUpdateStatus(todo) {
    const updatedStatus = { completed: !todo.completed };
    handleUpdateTodo(todo, updatedStatus);
  }

  // עדכון כותרת משימה
  function handleUpdateTitle(todo, newTitle) {
    if (!newTitle.trim()) {
      setNewTitle(todo.title);
      return;
    }
    const updatedTodo = { title: newTitle };
    handleUpdateTodo(todo, updatedTodo);
  }

  const handleUpdateClick = () => {
    if (isEditingTodo) {
      handleUpdateTitle(todo, newTitle);  // קורא לפונקציה לעדכון כותרת
    }
    setIsEditingTodo((prevState) => !prevState);  // משנה את המצב של עריכת הכותרת
  };

  async function handleUpdateTodo(todo, updateData) {
    try {
      await apiService.UpdateData(`todos/${todo.id}`, updateData);
      setTodos((prevTodos) => prevTodos.map((t) => t.id === todo.id ? { ...t, ...updateData } : t));
    } catch (error) {
      alert(`שגיאה בעדכון המשימה: ${error.message}`);
    }
  }

  async function handleDeleteTodo(taskId) {
    if (!apiService.confirmAction("האם אתה בטוח שברצונך למחוק את המשימה?")) {
      return;
    }
    try {
      await apiService.deleteData(`todos/${taskId}`)
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== taskId));
    }
    catch (error) {
      alert(`שגיאה במחיקת המשימה`);
    }
  }

  return (
    <div className="todo">
      <p>{todo.id}</p>
      {isEditingTodo ?
        (<>
          < input
            type="text"
            value={newTitle}
            onChange={(e) => { setNewTitle(e.target.value) }}
          />
        </>) : (
          <p className={todo.completed ? "completed" : ""}> {todo.title}</p>
        )}
      <p>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleUpdateStatus(todo)}
        />
        {todo.completed ? "בוצע" : "לא בוצע"}
      </p>

      <div class="todo-buttons">
        <button className="update" onClick={handleUpdateClick}>
          {isEditingTodo ? 'שמור' : 'עידכון'}
        </button>
        <button className="delete" onClick={() => handleDeleteTodo(todo.id)}>מחיקה</button>
      </div>
    </div>
  );
}
export default Todo;