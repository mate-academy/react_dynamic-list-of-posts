/// <reference types="react-scripts" /
interface Post {
  id: number,
  userId: number,
  completed: boolean,
  title: string,
  createdAT: string,
  updatedAt: string,
}

interface PostComment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAT: string,
  updatedAt: string,
}
