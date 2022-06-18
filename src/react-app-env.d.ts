/// <reference types="react-scripts" />

interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  body: string;
}
