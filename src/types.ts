export interface Post {
  body: string;
  id: number;
  createdAt: string;
  title: string;
  updatedAt: string;
  userId: number | null;
}

export type Comment = {
  id: number,
  postId: number,
  name: string,
  body: string,
  email: string,
};
