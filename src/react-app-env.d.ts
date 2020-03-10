interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  postId: number;
  id: number;
  name: string;
}

interface CorrectPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  postComments: Comment[];
}
