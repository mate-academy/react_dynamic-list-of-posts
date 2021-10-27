/// <reference types="react-scripts" />

interface Post {
  id: string;
  userId: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
