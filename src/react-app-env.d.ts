/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: Date,
  updatedAt: Date,
}
