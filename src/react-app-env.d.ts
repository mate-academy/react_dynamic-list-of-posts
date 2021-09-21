/// <reference types="react-scripts" />
interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt?: string,
  updatedAt?: string
}

interface Post {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
}
