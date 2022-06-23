/// <reference types="react-scripts" />

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface NewComment {
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface Comment extends NewComment {
  id: number;

}
