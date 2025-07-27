export interface PostComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<PostComment, 'name' | 'email' | 'body'>;
