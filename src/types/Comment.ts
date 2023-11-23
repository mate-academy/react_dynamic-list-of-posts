export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

export type CommentError = {
  errorName: boolean;
  errorEmail: boolean;
  errorBody: boolean;
};
