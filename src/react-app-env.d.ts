/// <reference types="react-scripts" />
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PostComment = {
  id: number;
  postId: number;
  body: string;
  name: string;
  email: string;
};
