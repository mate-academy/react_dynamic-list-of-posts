import { Post } from './Post';
import { User } from './User';
import { Comment } from './Comment';

export interface States {
  users: User[];
  postsByUserId: Post[];
  commentsByPostId: Comment[];
  errorMessage: string;
  hasCommentError: boolean;
  selectedUserId?: number | null;
  selectedPostId?: number | null;
  isUsersLoading: boolean;
  isPostsLoading: boolean;
  isCommentsLoading: boolean;
  isAddCommentLoading: boolean;
  isCommentFormActive: boolean;
  isSidebarOpen: boolean;
}
