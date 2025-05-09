import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apiService from "../../../apiService.js";
import Photo from "./photo";
import "../../../css/album.css";

function Album() {
  const [photos, setPhotos] = useState([]);
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0); // אינדקס התחלה לשליפה
  const [hasMore, setHasMore] = useState(true); // האם יש עוד תמונות לשלוף
  const [newPhoto, setNewPhoto] = useState({ title: "", url: "", thumbnailUrl: "" });
  const { albumId } = useParams();
  const page=10;

  useEffect(() => {
    fetchPhotos(`photos?albumId=${albumId}&_start=${start}&_limit=${page}`);
  }, [start]);

  function isValidUrl(string) {
    try {
      new URL(string); // בדיקה אם ה-URL חוקי
      return true;
    } catch {
      return false;
    }
  }

  const handleLoadMore = () => {
    if (loading || !hasMore) {
      return; // אם יש טעינה או שאין עוד תמונות לשלוף, לא נבצע שליפה
    }
    setLoading(true);
    setStart((prevStart) => prevStart + page); // עדכון אינדקס ההתחלה
  }

  async function fetchPhotos(url) {
    try {
      const data = await apiService.fetchData(url);

      if (data.length < page) {
        setHasMore(false);
      }
      if (start === 0)
        setPhotos((prevPhotos) => [...data]); // ננקה קודם את התמונות הישנות ונספק את החדשות
      else
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    }
    catch (error) {
      alert("שגיאה בשליפת תמונות");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPhoto(e) {
    e.preventDefault();

    if (!newPhoto.title.trim() || !newPhoto.thumbnailUrl.trim() || !newPhoto.url.trim()) {
      return alert("אנא מלא את כל השדות");
    }
    if (!isValidUrl(newPhoto.thumbnailUrl) || !isValidUrl(newPhoto.url)) {
      return alert("אנא הזן URL תקין");
    }

    const photoToAdd = {
      albumId: albumId,
      title: newPhoto.title.trim(),
      url: newPhoto.url.trim(),
      thumbnailUrl: newPhoto.thumbnailUrl.trim(),
    };

    try {
      const createdPhoto = await apiService.addData(`photos`, photoToAdd);
      setPhotos((prevPhotos) => [...prevPhotos, createdPhoto]); // עדכון רשימת תמונות
      setNewPhoto({ title: "", url: "", thumbnailUrl: "" }); // איפוס הטופס
      setIsAddingPhoto(false); // סגירת הטופס
    } catch (error) {
      alert("שגיאה בהוספת תמונה");
    }
  }

  return (
    <div className="album-container">
      <h1>אלבום {albumId}</h1>

      {isAddingPhoto && (
        <form onSubmit={handleAddPhoto}>
          <input
            type="text"
            placeholder="title"
            value={newPhoto.title}
            onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
          />
          <input
            type="url"
            value={newPhoto.url}
            placeholder="url"
            onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
          />
          <input
            type="url"
            value={newPhoto.thumbnailUrl}
            placeholder="thumbnailUrl"
            onChange={(e) => setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })}
          />
          <button type="submit">שמור</button>
        </form>
      )}

      <button onClick={() => setIsAddingPhoto(!isAddingPhoto)}>
        {isAddingPhoto ? "בטל" : "הוסף תמונה"}
      </button>

      <div className="photos-list">
        {photos.length > 0 ? (
          photos.map((photo) => (
            photo.id ? <Photo key={photo.id} photo={photo} setPhotos={setPhotos} /> : null
          ))
        ) : (
          <p>אין תמונות להצגה.</p>
        )}
      </div>

      {loading ? (
        <p>טוען תמונות...</p>
      ) : hasMore ? (
        <button onClick={handleLoadMore}>הבא</button>
      ) : (
        <p>אין עוד תמונות להצגה</p>
      )}
    </div>
  );
}
export default Album;