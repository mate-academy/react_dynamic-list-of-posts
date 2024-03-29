export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentResponse extends Comment {
  createdAt: string;
  updatedAt: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
