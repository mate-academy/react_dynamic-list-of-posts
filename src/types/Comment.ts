export interface Comment {
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
