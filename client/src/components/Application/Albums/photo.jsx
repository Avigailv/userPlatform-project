import React, { useState } from "react";
import { useNavigate, Outlet, Link, useParams } from "react-router-dom";
import * as apiService from "../../../apiService.js";
// import "../../../css/photo.css";

function Photo({ photo, setPhotos }) {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [updatePhoto, setUpdatePhoto] = useState({
    title: photo.title,
    url: photo.url,
    thumbnailUrl: photo.thumbnailUrl,
  });

  // מחיקת תמונה
  async function handleDeletePhoto() {
    if (!apiService.confirmAction("האם אתה בטוח שברצונך למחוק את התמונה?")) {
      return;
    }
    try {
      await apiService.deleteData(`photos/${photo.id}`);
      setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== photo.id));
    } catch (error) {
      alert("שגיאה במחיקת התמונה");
    }
  }

  // עדכון תמונה
  async function handleUpdatePhoto(e) {
    e.preventDefault();

    if (!updatePhoto.title.trim() || !updatePhoto.url.trim() || !updatePhoto.thumbnailUrl.trim()) {
      alert("אנא מלא את כל השדות לפני שמירת התמונה");
      return;
    }
    const updatedPhoto = {
      title: updatePhoto.title.trim(),
      url: updatePhoto.url.trim(),
      thumbnailUrl: updatePhoto.thumbnailUrl.trim(),
    }
    try {
      const updated = await apiService.UpdateData(`photos/${photo.id}`, updatedPhoto);
      setPhotos((prevPhotos) =>
        prevPhotos.map((p) => (p.id === photo.id ? { ...p, ...updatedPhoto } : p))
      );
      setIsEditingPhoto(false);
    } catch (error) {
      alert("שגיאה בעדכון התמונה");
    }
  }

  return (
    <div className="photo-card">
      {isEditingPhoto ? (
        <form onSubmit={handleUpdatePhoto}>
          <input
            type="text"
            value={updatePhoto.title}
            onChange={(e) =>
              setUpdatePhoto({ ...updatePhoto, title: e.target.value })
            }
          />
          <input
            type="url"
            value={updatePhoto.url}
            onChange={(e) =>
              setUpdatePhoto({ ...updatePhoto, url: e.target.value })
            }
          />
          <input
            type="url"
            value={updatePhoto.thumbnailUrl}
            onChange={(e) =>
              setUpdatePhoto({ ...updatePhoto, thumbnailUrl: e.target.value })
            }
          />
          <button type="submit">שמור</button>
          <button type="button" onClick={() => setIsEditingPhoto(false)}>בטל</button>
        </form>
      ) : (
        <>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <h5>{photo.title}</h5>
          <p>{photo.id}</p>
          <button onClick={() => setIsEditingPhoto(true)}>ערוך</button>
          <button onClick={handleDeletePhoto}>מחק</button>
        </>
      )}
    </div>
  );
}
export default Photo;