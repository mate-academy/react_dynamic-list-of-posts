export interface Comments {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comments, 'name' | 'email' | 'body'>;
