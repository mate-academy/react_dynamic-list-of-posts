export interface Comment {
  loading: boolean;
  errorBody: string;
  errorEmail: string;
  errorName: string;
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, "name" | "email" | "body">;
