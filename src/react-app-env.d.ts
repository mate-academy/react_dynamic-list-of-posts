/// <reference types="react-scripts" />

export type UserPost = {
  id: number,
  createdAt: string,
  updatedAt:string,
  userId: number,
  title: string,
  body: string,
};

export type PostListType = {
  userId: number,
};

export type PostDetailsType = {
  selectedPostId: number,
};

export type PostCommentType = {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: 79,
  name: string,
  email: string,
  body: string,
};
