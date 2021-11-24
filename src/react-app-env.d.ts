/// <reference types="react-scripts" />

interface User {
  name: string,
  id:number
}

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: string,
  updatedAt: string
}

interface CommentBody {
  postId: number,
  name: string,
  email: string,
  body: string,
}
