export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
};

export type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt?: Date,
  updatedAt?: Date,
};

export type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt?: Date,
  updatedAt?: Date,
};
