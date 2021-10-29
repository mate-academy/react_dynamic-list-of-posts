/// <reference types="react-scripts" />

interface Post {
  id: string,
  userId: string,
  title: string,
  body: string,
}

interface Comment {
  id: string,
  postId: string;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
}
