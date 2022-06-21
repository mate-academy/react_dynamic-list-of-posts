/// <reference types="react-scripts" />

export interface Post {
  body: string,
  createdAt: string,
  id: number,
  title: string,
  updatedAt: string,
  userId: number,
}

export interface Comment {
  body: string,
  createdAt: string,
  email: string,
  id: number,
  name: string,
  postId: number,
  updatedAt: string,
}

export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
