export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentError {
  name: boolean;
  email: boolean;
  body: boolean;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
