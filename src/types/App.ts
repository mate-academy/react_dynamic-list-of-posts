import { Post } from './Post';
import { User } from './User';

export interface AppState {
  selectedUser: User | null;
  selectedPost: Post | null;
  isLoadingPosts: boolean;
  postsError: boolean;
}
