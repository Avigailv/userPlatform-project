import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import SearchBar from "../Search.jsx";
import "../../home";
import * as apiService from "../../../apiService.js";
import "../../../css/albums.css";

function Albums() {
  const currentUser = useOutletContext();
  const [albums, setAlbums] = useState([]);
  const [results, setResults] = useState([]);
  const [isAddingAlbum, setIsAddingAlbum] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchUserAlbums();
  }, []);

  async function fetchUserAlbums() {
    try {
      const data = await apiService.fetchData(`albums?userId=${currentUser.id}`);
      setAlbums(data);
    } catch (error) {
      alert(`שגיאה בשליפת האלבומים`);
    }
  }

  async function handleAddAlbum(e) {
    e.preventDefault();
    if (!newTitle.trim()) {
      return;
    }
    const newAlbum = {
      userId: currentUser.id,
      title: newTitle.trim(),
    };
    try {
      const createdAlbum = await apiService.addData("albums", newAlbum);
      setAlbums((prevAlbums) => [...prevAlbums, createdAlbum]);
      setNewTitle("");
      setIsAddingAlbum(false);
    } catch (error) {
      alert("שגיאה בהוספת Album");
    }
  }

  return (
    <div className="page-container">

      <div className="search-section">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} item="albums" />
        </div>
      </div>

      <div className="albums-list">
        <div className="albums-controls">
        <h1>אלבומים</h1>

          <button className="add-album-btn" onClick={() => setIsAddingAlbum(!isAddingAlbum)}>
            {isAddingAlbum ? "בטל" : "הוסף אלבום"}
          </button>

          {isAddingAlbum && (
            <form onSubmit={handleAddAlbum} className="album-form">
              <input
                type="text"
                placeholder="הכנס אלבום חדש"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="album-input"
              />
              <button type="submit">שמור</button>
            </form>
          )}
        </div>

        <div className="albums-container">
        {albums.length === 0 ? (
          <p>אין אלבומים להצגה.</p>
        ) : (
          (results.length > 0 ? results : albums).map((album) => (
            <div className="album-card" key={album.id}>
              <Link to={`${album.id}/photos`} className="album-link">
                <div className="album-info">
                  <div className="album-id">ID: {album.id}</div>
                  <div className="album-title">{album.title}</div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>

    </div>
  );
}
export default Albums;