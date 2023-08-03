export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<IComment, 'name' | 'email' | 'body'>;
