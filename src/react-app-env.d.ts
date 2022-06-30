/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}
interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface UnpablishedComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}
