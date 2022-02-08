/// <reference types="react-scripts" />

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

type PostComm = {
  postId: number,
  name: string,
  email: string,
  body: string,
};
