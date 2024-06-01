/* eslint-disable */
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

type CommentWithoutId = Omit<Comment, 'id'>;
export type CommentData = Pick<
  CommentWithoutId,
  'name' | 'email' | 'body' | 'postId'
>;
