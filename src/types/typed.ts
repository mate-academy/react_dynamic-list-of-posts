export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
