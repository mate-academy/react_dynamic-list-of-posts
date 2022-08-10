/// <reference types="react-scripts" />

type Post = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

type Comment = {
  postId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  body: string;
};
