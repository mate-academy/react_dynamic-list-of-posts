import { Comment } from './Comment';
import { ErrorType } from './ErrorType';
import { Post } from './Post';
import { User } from './User';

export type Context = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  isPostsLoading: boolean;
  setIsPostsLoading: (loading: boolean) => void;
  isCommentsLoading: boolean;
  setIsCommentsLoading: (loading: boolean) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  error: ErrorType,
  setError: (error: ErrorType) => void,
  selectedPost: Post | null,
  setSelectedPost: (post: Post | null) => void,
  comments: Comment[],
  setComments: (comments: Comment[]) => void,
  isFormOpen: boolean,
  setIsFormOpen: (isOpen: boolean) => void,
};
