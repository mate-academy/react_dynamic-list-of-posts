// <reference types=react-scripts />

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};

type CommentPost = {
  id?: number,
  postId: number,
  name: string,
  email: string,
  body: string,
};
