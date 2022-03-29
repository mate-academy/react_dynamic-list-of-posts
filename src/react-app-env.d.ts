/// <reference types="react-scripts" />

interface User {
  id: number,
  name: string,
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
  body: string,
}

interface PostComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
