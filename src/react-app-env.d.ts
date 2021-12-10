/// <reference types="react-scripts" />

export type Post = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export type forComment = {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  email: string,
  body: string,
};
