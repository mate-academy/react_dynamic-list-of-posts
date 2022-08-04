/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface PostComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
