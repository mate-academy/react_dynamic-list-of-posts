export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

export interface CommentDataErrors {
  name: boolean;
  email: boolean;
  body: boolean;
}
