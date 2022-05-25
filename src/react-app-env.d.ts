/// <reference types="react-scripts" />
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  body: string;
}

interface User {
  id: number;
  name: string;
}
