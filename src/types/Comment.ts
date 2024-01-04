export interface Comment {
  id: number;
  postId: number;
  name: string | undefined;
  email: string | undefined;
  body: string | undefined;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
