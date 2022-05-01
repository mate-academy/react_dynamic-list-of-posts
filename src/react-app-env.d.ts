/// <reference types="react-scripts" />

interface Posts {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Users {
  id: number;
  name: string;
}

interface Comments {
  id: number;
  postId: number;
  body: string;
  email: string;
  name: string;
}
