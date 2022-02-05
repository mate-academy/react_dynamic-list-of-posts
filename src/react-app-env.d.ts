/// <reference types="react-scripts" />

interface Post {
  id: nimber;
  createdAt: string;
  updatedAt: string;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number,
  createdAt: string;
  updatedAt: string;
  postId: number;
  name: string;
  email: string;
  body: string;
}

type NewComment = Pick<Comment, 'postId' | 'name' | 'email' | 'body'>;
