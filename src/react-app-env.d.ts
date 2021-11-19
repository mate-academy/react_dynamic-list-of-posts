/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface Comment {
  id: number,
  postId: number,
  createdAt: string,
  name: string,
}

interface CommentBody {
  postId: number,
  name: string,
  email: string,
  body: string,
}
