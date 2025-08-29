export interface AppComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<AppComment, 'name' | 'email' | 'body'>;
