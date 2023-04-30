export interface CommentType {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = (
  Omit<CommentType, 'id'>
);
