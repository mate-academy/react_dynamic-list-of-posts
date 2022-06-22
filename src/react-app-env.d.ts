/// <reference types="react-scripts" />
export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string
};

export type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
};
