/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

interface User {
  name: string,
  username: string,
  email: string,
  phone: string
  id: number
}

interface Comment {
  postId: number,
  name: string,
  email: string,
  body: string
  id: number
}

interface AddComment {
  postId: number,
  name: string,
  email: string,
  body: string
}
