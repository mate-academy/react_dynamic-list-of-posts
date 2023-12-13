export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

export enum CommentField {
  Name = 'name',
  Email = 'email',
  Body = 'body',
}
