export interface Post {
  [key: string]: string | number | boolean | User | Comment;
  key: number;
  id: number;
  title: string;
  body: string;
  user: User;
}

export interface User {
  [key: string]: string | number;
  id: number;
}

export interface Comment {
  [key: string]: string | number;
  id: number;
  postId: number;
}

export interface StateApp {
  posts: Post[];
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
}
