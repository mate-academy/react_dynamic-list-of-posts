export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;

export enum CommentError {
  FETCHING = 'Something went wrong',
  DELETING = 'Error while deleting comment',
}
