/// <reference types="react-scripts" />

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

type User = {
  id: 3,
  name: string,
  username: string,
  email: string,
  phone: string,
};

type PostComment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
};
