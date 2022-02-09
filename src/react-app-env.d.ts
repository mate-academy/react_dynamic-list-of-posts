/// <reference types="react-scripts" />

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PostComment = {
  id: number;
  userId: number;
  name: string;
  email: string;
  body: string;
};
