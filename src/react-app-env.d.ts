/// <reference types="react-scripts" />

interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  phone: string;
  website: string;
}

interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  name: string;
  body: string;
  postId: number;
}
