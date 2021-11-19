export type Post = {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  body: string;
};

export interface PostComment {
  email: string,
  name: string,
  body: string,
  id: number,
  postId: number,
}
