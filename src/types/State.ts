import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export interface State {
  users: User[];
  selectedUser: User | null;
  posts: Post[];
  selectedPost: Post | null;
  comments: Comment[];
  error: string;
  loading: boolean;
}

export interface StateSetters {
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setPosts: (userId: number) => void;
  setSelectedPost: (post: Post | null) => void;
  setComments: (postId: number) => void;
  addComment: (comment: Comment) => void;
  deleteComment: (commentId: number) => void;
  setError: (error: string) => void;
  setLoading: (value: boolean) => void;
}
