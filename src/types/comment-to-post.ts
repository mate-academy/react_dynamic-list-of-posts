export interface CommentToPost {
  [key: string]: string | number;
  postId: number,
  name: string,
  email: string,
  body: string,
}
