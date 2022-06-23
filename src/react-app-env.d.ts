/// <reference types="react-scripts" />

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string
}

interface User {
  createdAt: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  updatedAt: string,
  username: string,
  website: string,
}

interface NewComment {
  body: string,
  email: string,
  name: string,
  postId: number,
}

interface Comment extends NewComment {
  id: number
}
