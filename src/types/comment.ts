export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CreateComment = Omit<Comment, 'id'>;
