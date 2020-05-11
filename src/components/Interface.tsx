export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

export interface User {
  [key: string]: string | number;
  id: number;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface StateApp {
  posts: Post[];
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  searchQuery: string;
}

export interface StateSearch {
  searchQuery: string;
}
