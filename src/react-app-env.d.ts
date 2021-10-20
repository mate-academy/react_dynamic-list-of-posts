/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
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
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  email: string,
  body: string,
}
