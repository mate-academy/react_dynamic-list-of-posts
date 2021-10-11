/// <reference types="react-scripts" />

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  name: string;
  email: string;
  id: number;
}
