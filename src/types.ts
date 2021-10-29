export type User = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PostComment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};
