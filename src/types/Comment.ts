interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default Comment;

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
