export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string,
  updatedAt: string,
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
