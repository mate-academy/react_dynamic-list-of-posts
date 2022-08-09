// / <reference types="react-scripts"

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
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
  email: string,
}

interface Option {
  method: string,
  headers: {},
  body: string,
}
