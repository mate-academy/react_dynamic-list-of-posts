export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type TCommentData = Pick<IComment, 'name' | 'email' | 'body'>;
