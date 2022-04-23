/// <reference types="react-scripts" />

interface Post {
  id: number;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  body: string;
}
