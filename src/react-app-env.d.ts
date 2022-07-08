/// <reference types="react-scripts" />

interface Post {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string
}

interface Comment {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
}
