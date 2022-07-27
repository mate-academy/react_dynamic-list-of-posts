/// <reference types="react-scripts" />

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  id: number;
  postId: number;
  body: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NewComment {
  postId: number;
  body: string;
  name: string;
  email: string;
}

interface Options {
  method: string;
  body?: string;
  headers?: {};
}
