export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserAddress {
  street: string;
  suite: string;
  city: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: UserAddress;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface PostExtended {
  id: number;
  title: string;
  body: string;
  author?: User;
  comments: Comment[];
}
