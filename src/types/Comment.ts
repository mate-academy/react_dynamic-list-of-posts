export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentDataWithId = Pick<Comment, 'id' | 'name' | 'email' | 'body'>;
export type CommentWithoutId = Omit<Comment, 'id'>;
