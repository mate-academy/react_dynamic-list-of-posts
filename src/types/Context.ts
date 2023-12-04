import { Post } from './Post';
import { User } from './User';

export interface Context {
  users: User[],
  posts: Post[],
  setPosts: (posts: Post[]) => void,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
}
