export interface Comment {
  id: number;
  postId: number | null;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'postId' | 'name' | 'email' | 'body'>;
