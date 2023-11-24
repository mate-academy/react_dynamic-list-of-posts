import { Post } from './Post';

export interface PostsContext {
  posts: Post[];
  setPosts: (v: Post[]) => void;
  hasPostsError: boolean;
  setHasPostsError: (v: boolean) => void;
  isLoadingPosts: boolean;
  setIsLoadingPosts: (v: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (v: Post | null) => void;
}
