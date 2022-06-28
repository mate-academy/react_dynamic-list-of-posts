/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}

interface Comment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface CommentWithId extends Comment {
  id: number,
}
