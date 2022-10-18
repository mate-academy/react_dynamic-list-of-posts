export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = {
  name: string,
  email: string,
  body: string,
  postId: number,
};
