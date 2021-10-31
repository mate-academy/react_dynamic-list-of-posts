/// <reference types="react-scripts" />

type Post = {
  id: number,
  title: string,
  userId: number,
  body: string,
};

type CommentList = {
  id: number,
  postId: number,
  body: string,
  name: string,
  email: string,
};
