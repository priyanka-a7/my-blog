// src/context/PostContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  author?: string;
  excerpt: string; 
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  deletePost: (id: number) => void;
  editPost: (post: Post) => void;
  fetchPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:3001/posts');
    const data = await response.json();
    setPosts(data);
  };

  const addPost = async (post: Post) => {
    const response = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    const newPost = await response.json();
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const deletePost = async (id: number) => {
    await fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
    });
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const editPost = async (updatedPost: Post) => {
    await fetch(`http://localhost:3001/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    });
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts initially when the context is mounted
  }, []);

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, editPost, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
