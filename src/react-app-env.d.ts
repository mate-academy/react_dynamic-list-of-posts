/// <reference types="react-scripts" />

type Props = {
  posts: Post[],
};

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
