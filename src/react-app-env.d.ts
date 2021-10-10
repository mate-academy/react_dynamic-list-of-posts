/// <reference types="react-scripts" />

export type Post = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
};

export type Comment = {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  email: string,
  body: string,
};
