export interface Comment {
  id: number;
  postId: number | undefined; // костиль тре подумати як виправити!!!
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
