import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Post from "./post";
import SearchBar from "../Search";
import * as apiService from "../../../apiService.js";
import "../../../css/posts.css";

function Posts() {
  const currentUser = useOutletContext();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [allUsersPosts, setallUsersPosts] = useState([]);
  const [showAllUsersPosts, setshowAllUsersPosts] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  function handleViewPosts() {
    if (!showAllUsersPosts) {
      fetchAllUsersPosts();
    }
    else {
      setshowAllUsersPosts(false);
    }
  }

  async function fetchUserPosts() {
    try {
      const data = await apiService.fetchData(`posts?user_id=${currentUser.id}`);
      setPosts(data);
    } catch (error) {
      alert(`שגיאה במהלך זיהוי המשתמש`);
    }
  }

  async function fetchAllUsersPosts() {
    try {
      const data = await apiService.fetchData(`posts`);
      setallUsersPosts(data);
      setshowAllUsersPosts(true);
    } catch (error) {
      alert("שגיאה בשליפת התגובות");
    }
  }

  async function handleAddPost(e) {
    e.preventDefault();
    if (!newPost.title.trim()) {
      return;
    }
    const newPostData = {
      userId: currentUser.id,
      title: newPost.title.trim(),
      body: newPost.body.trim(),
    };
    try {
      const createdPost = await apiService.addData(`posts`, newPostData);
      setPosts((prevPosts) => [...prevPosts, createdPost]);
      setNewPost({ title: "", body: "" });
      setIsAddingPost(false);
    } catch (error) {
      alert(`שגיאה בהוספת פוסט`);
    }
  }

 
  return (
    <div className="posts-container">

      <div className="posts-section">
        <h1>פוסטים</h1>
        {isAddingPost && (
          <form onSubmit={handleAddPost} className="add-post-form">
            <input
              type="text"
              placeholder="כותרת חדשה"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <textarea
              placeholder="תוכן הפוסט"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
              required
              rows="5"
            />
            <button type="submit">שמור</button>
          </form>
        )}

        <button onClick={() => setIsAddingPost(!isAddingPost)}>
          {isAddingPost ? "בטל" : "הוסף פוסט"}
        </button>

        <button onClick={handleViewPosts}>
          {showAllUsersPosts ? "הפוסטים שלי" : "הצגת הפוסטים של כולם"}
        </button>

        <div className="posts-list">
          {results.length > 0 ? results.map((post) => (
            <Post key={post.id} post={post} setPosts={setResults} />
          ))
            : showAllUsersPosts ? allUsersPosts.map((post) =>
              post.userId !== currentUser.id && (
                <Post key={post.id} post={post} setPosts={setallUsersPosts} />
              ))
              : posts.map((post) => (
                <Post key={post.id} post={post} setPosts={setPosts} />
              ))}
        </div>
      </div>

      <div className="search-section">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} item="posts" />
        </div>
      </div>

    </div>
  );
}
export default Posts;