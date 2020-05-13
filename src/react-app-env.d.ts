// eslint-disable-next-line
/// <reference types="react-scripts" />

type Posts = {
  posts: Post[];
};

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

type User = {
  id: number;
  name: string;
  email: string;
  address: Address;
};

interface Address {
  [key: string]: string;
}

type Comments = {
  comments: Comment[];
};

interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

type SearchPost = {
  query: string;
  onSearch: ChangeEventHandler<HTMLInputElement>;
};
