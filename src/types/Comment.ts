export interface Comment {
  statusCode: any;
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
