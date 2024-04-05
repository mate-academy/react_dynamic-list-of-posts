import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export type Action =
  | { type: 'loadUsers'; users: User[] }
  | { type: 'setError'; message: string }
  | { type: 'setUser'; id: number }
  | { type: 'setPosts'; posts: Post[] }
  | { type: 'setLoading'; value: boolean }
  | { type: 'toggleSideBar'; payload: boolean }
  | { type: 'setSelectedPost'; id: number }
  | { type: 'setComments'; comments: Comment[] }
  | { type: 'addComment'; comment: Comment }
  | { type: 'deleteComment'; id: number };
