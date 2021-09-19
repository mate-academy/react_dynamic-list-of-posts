/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
}

interface PostDetails {
  id: number;
  body: string;
}

interface CommentData {
  id: number;
  body: string;
}

interface CommentResponse {
  name: string;
  email: string;
  body: string;
}
