/// <reference types="react-scripts" />

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PostComment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};
