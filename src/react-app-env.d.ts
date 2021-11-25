/// <reference types="react-scripts" />

interface Header {
  [key: string]: string;
}

interface RequestFormat {
  method: string
  headers?: Header,
  body?: string,
}

interface Post {
  id: number,
  userId: number,
  title: string,
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface User {
  name?: string,
  id: number,
}
