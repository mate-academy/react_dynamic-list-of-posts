export interface Comment {
  id: СommentID;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type СommentID = number;

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
