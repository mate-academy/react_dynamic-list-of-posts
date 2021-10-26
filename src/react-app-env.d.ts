/// <reference types="react-scripts" />
interface Post {
  body: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

interface PostDetails {
  body: string;
  createdAt: string;
  id: number;
  title: string;
  updatedAt: string;
  userId: number;
}

interface Comment {
  body: string;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  postId: number;
  updatedAt: string;
}
