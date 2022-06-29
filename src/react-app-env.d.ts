/// <reference types="react-scripts" />

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}
