export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type RawComment = Omit<Comment, 'id'>;

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
