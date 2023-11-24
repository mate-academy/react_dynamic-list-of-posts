import { Post } from './Post';
import { Comment } from './Comment';

export interface PostsContext {
  posts: Post[];
  setPosts: (v: Post[]) => void;
  hasPostsError: boolean;
  setHasPostsError: (v: boolean) => void;
  isLoadingPosts: boolean;
  setIsLoadingPosts: (v: boolean) => void;
  isSidebarOpen: boolean
  setIsSidebarOpen: (v: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (v: Post) => void;
  comments: Comment[],
  setComments: (v: Comment[]) => void;
  isLoadingComments: boolean;
  setIsLoadingComments: (v: boolean) => void;
  hasCommentsError: boolean;
  setHasCommentsError: (v: boolean) => void;
}
