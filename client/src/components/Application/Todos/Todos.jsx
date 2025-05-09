import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Todo from "./todo";
import SearchBar from "../Search";
import "../../../css/todos.css";
import * as apiService from "../../../apiService.js";

function Todos() {
  const currentUser = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newTitle, setNewTitle] = useState(""); // שדה משימה חדשה
  const [isAddingTodo, setIsAddingTodo] = useState(false); // מצב הצגת הטופס
  const [results, setResults] = useState([]); // תוצאות חיפוש

  useEffect(() => {
    fetchUserTodos();
  }, []);

  async function fetchUserTodos() {
    try {
      const data = await apiService.fetchData(`todos?userId=${(currentUser.id)}`);
      setTodos(data);
    }
    catch (error) {
      alert(`שגיאה בשליפת המשימות`);
    }
  }

  async function handleAddTodo(e) {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    const newTodo = {
      userId: currentUser.id,
      title: newTitle.trim(),
      completed: false
    };
    try {
      const createdTodo = await apiService.addData(`todos`, newTodo)
      setTodos((prevTodos) => [...prevTodos, createdTodo]); 
      setNewTitle("");
      setIsAddingTodo(false); // סגירת הטופס
    }
    catch (error) {
      alert(`שגיאה בהוספת משימה:`);
    }
  }

  // סינון ומיון משימות
  const filteredTodos = (todos)
    .filter((todo) => {
      if (filter === "all") return true;
      if (filter === "completed") return todo.completed;
      if (filter === "notCompleted") return !todo.completed;
      return true; // ברירת מחדל
    })
    .sort((a, b) => {
      if (filter === "alphabetical") {
        return a.title.localeCompare(b.title, "he"); // מיון לפי א'–ב' בעברית
      }
      if (filter === "id") {
        return a.id - b.id; // מיון לפי הערך המספרי
      }
      return 0; // ללא מיון
    });

  return (
    <div className="page-container">

      <div className="search-section">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} item="todos" />
        </div>
      </div>
      <div className="todos-section">
        <h1>משימות</h1>
        <div className="todos-controls">
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">הכל</option>
            <option value="completed">בוצע</option>
            <option value="notCompleted">לא בוצע</option>
            <option value="alphabetical">אלפבתי</option>
            <option value="id">id</option>
          </select>
          <button onClick={() => setIsAddingTodo(!isAddingTodo)}>{isAddingTodo ? "בטל" : "הוסף משימה"}</button>
        </div>

        {isAddingTodo && (
          <form onSubmit={handleAddTodo}>
            <input
              type="text"
              placeholder="הכנס משימה חדשה"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
            <button type="submit">שמור</button>
          </form>
        )}

        <div className="todos-list">
          {results.length > 0 ? (
            results.map((todo) => (
              <Todo key={todo.id} todo={todo} setTodos={setResults} />
            ))
          ) : filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <Todo key={todo.id} todo={todo} setTodos={setTodos} />
            ))
          ) : (
            <p>אין משימות להצגה.</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Todos;