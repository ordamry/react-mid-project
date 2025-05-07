import { useState, useEffect } from 'react';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleAddPost = (userId) => {
    if (newPostTitle.trim() === "" || newPostBody.trim() === "") return;
    const newPost = {
      userId,
      id: posts.length + 1,
      title: newPostTitle,
      body: newPostBody,
    };
    setPosts([...posts, newPost]);
    setNewPostTitle("");
    setNewPostBody("");
    setIsAddingPost(false);
  };

  const getUserPosts = (userId) => {
    return posts.filter((post) => post.userId === userId);
  };

  return {
    posts,
    isAddingPost,
    newPostTitle,
    newPostBody,
    setIsAddingPost,
    setNewPostTitle,
    setNewPostBody,
    handleAddPost,
    getUserPosts
  };
}; 