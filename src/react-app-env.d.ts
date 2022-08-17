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
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  body: string;
};

type PostDetails = {
  id: string;
  userId: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

type NewComment = {
  postId: string,
  name: string,
  email: string,
  body: string,
};
