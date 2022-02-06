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
}

interface ServerComment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}
