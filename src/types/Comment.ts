export interface Comment {
  id: number;
  postId: number | undefined;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
