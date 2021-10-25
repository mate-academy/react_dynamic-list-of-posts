/// <reference types="react-scripts" />

interface UserTypes {
  name: string;
  id: number;
}

interface PostTypes {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface CommentTypes {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
