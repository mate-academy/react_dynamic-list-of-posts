import { Post } from './Post';
import { User } from './User';
import { Comment } from './Comment';

export interface States {
  users: User[];
  postsByUserId: Post[];
  commentsByPostId: Comment[];
  hasError: boolean;
  errorMessage: string;
  hasCommentError: boolean;
  selectedUserId?: number | null;
  selectedPostId?: number | null;
  isLoading: boolean;
  isCommentFormActive: boolean;
  isSidebarOpen: boolean;
}
