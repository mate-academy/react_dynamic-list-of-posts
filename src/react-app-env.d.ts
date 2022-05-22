/// <reference types="react-scripts" />

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PostComment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

type NewComment = Omit<PostComment, 'id'>;
