/// <reference types="react-scripts" />

interface Post {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
}

interface IComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
