import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

export interface CommentsContextType {
  comments: Comment[];
  loading: boolean;
  errorMessage: string;
  loadComments: (postId: number) => void;
  deletedComment: (commentId: number) => void;
  addComment: (comment: Comment) => void;
  addLoading: boolean;
  text: string;
  setText: (text: string) => void;
  openForm: boolean;
  setOpenForm: (value: boolean) => void;
}

export interface PostsContextType {
  posts: Post[];
  loading: boolean;
  errorMessage: string;
  loadPosts: (userId: number) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}

export interface UsersContextType {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}
