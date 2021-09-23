/// <reference types="react-scripts" />

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  postId: number | undefined;
  body: string;
}
