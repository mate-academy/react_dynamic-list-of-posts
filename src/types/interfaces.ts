export interface Comment {
  id: number;
  postId: number | null;
  name: string;
  email: string;
  body: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface InputForm {
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
