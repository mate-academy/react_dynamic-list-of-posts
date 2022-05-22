/// <reference types="react-scripts" />

interface Post {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
}

interface User {
  createdAt: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  updatedAt: string,
  username: string,
  website: string,
}

interface Comments {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  email: string,
  body: string,
}
