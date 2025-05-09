import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/search.css";
import * as apiService from "../../apiService";

function SearchBar({ setResults, item }) {
  const [searchTerm, setSearchTerm] = useState(""); // טקסט חיפוש
  const [searchCriteria, setSearchCriteria] = useState("id"); // קריטריון חיפוש
  const [status, setStatus] = useState(null); // מצב ביצוע לחיפוש
  const { userId } = useParams();
  let apiPath;

  // קריאה לשרת
  async function fetchResults() {
    if (!searchTerm.trim() && status === null) {
      setResults([]); // אם החיפוש ריק ואין סטטוס נבחר, ננקה תוצאות
      return;
    }

    try {
      // בניית ה-API לפי הקריטריונים שנבחרו
      if (item == "posts") {
        apiPath = `posts?${searchCriteria}=${searchTerm}`
      }
      else if (item == "todos" || item == "albums") {
        apiPath = `${item}?userId=${userId}&${searchCriteria}=${searchTerm}`;
        if (status !== null) {
          apiPath += `&completed=${status}`;
        }
      }
      const results = await apiService.fetchData(apiPath);
      setResults(results);

      if (results.length === 0) {
        alert("הפריט שחיפשת איננו נמצא");
      }
    } catch (error) {
      alert("שגיאה בחיפוש");
    }
  };

  // פונקציה לניקוי תוצאות החיפוש
  const clearSearch = () => {
    setSearchTerm(""); // איפוס טקסט החיפוש
    setStatus(null); // איפוס מצב הביצוע
    setResults([]); // איפוס תוצאות החיפוש
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="חפש פריט..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <select
        value={searchCriteria}
        onChange={(e) => setSearchCriteria(e.target.value)}
        className="search-select"
      >
        <option value="id">מספר מזהה</option>
        <option value="title">כותרת</option>
      </select>
      {item === "todos" && (
        <div>
          <label>
            מצב ביצוע:
            <input
              type="checkbox"
              onChange={(e) => setStatus(e.target.checked ? "true" : "false")}
            />
          </label>
        </div>
      )}

      <button onClick={fetchResults}>חפש</button>
      <button onClick={clearSearch} className="clear-button">נקה חיפוש</button>
    </div>
  );
}
export default SearchBar;