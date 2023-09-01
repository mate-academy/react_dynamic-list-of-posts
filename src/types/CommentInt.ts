export interface CommentInt {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<
CommentInt, 'name' | 'email' | 'body' | 'postId'
>;
