/// <reference types='react-scripts' />

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
}

export interface Comment {
  id: number,
  userId: number,
  title: string,
  body: string,
}

export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
