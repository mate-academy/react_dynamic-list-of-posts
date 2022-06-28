/// <reference types="react-scripts" />

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}

export interface Comment {
  name: string,
  email: string,
  body: string,
  postId: number,
}

export interface NewComment extends Comment {
  id: number,
}
