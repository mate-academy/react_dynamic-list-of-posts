import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export interface ContextType {
  users: User[];
  setUsers: (x: User[]) => void;
  userPosts: Post[];
  setUserPosts: (x: Post[]) => void;
  selectedUser: number | null;
  setSelectedUser: (x: number) => void;
  selectedPostId: number | null;
  setSelectedPostId: (x: number) => void;
  isLoadingList: boolean;
  setIsLoadingList: (x: boolean) => void;
  isLoadingComments: boolean;
  setIsLoadingComments: (x: boolean) => void;
  postComments: Comment[];
  setPostComments: (x: Comment[]) => void;
  errorM: boolean;
  setErrorM: (x: boolean) => void;
  post: Post | undefined;
  setPost: (x: Post) => void;
  setNewComment: (x: boolean) => void;
}
