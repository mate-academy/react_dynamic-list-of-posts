/// <reference types="react-scripts" />

interface Header {
  [key: string]: string;
}

interface Request {
  method: string
  headers: Header,
  body: string,
}

interface Post {
  id: number,
  userId: number,
  title: string,
}

interface User {
  name?: string,
  id: number,
}
