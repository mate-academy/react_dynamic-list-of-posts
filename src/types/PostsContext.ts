import { Post } from './Post';

export interface PostsContext {
  posts: Post[];
  setPosts: (v: Post[]) => void;
  hasError: boolean;
  setHasError: (v: boolean) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}
