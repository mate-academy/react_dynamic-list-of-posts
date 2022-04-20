export interface Post {
  id: number;
  userId: number;
  title: string;
}

export interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: Date,
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}
