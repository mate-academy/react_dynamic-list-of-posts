export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  postId: number;
  name: string;
  email: string;
  body: string;
}
