/// <reference types="react-scripts" />

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
};

export interface Comment {
  id: number
  createdAt?: string
  updatedAt?: string
  postId: number
  name: string
  email: string
  body: string
}
