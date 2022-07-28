/// <reference types="react-scripts" />

interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  body: string;
}

interface CommentType {
  id: number;
  createdAt: string;
  updatedAt: string;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface NewComment {
  name: string;
  email: string;
  body: string;
}
