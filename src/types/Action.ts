import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export type Action =
  | { type: 'setUsers'; payload: User[] }
  | { type: 'selectUser'; payload: User | null }
  | { type: 'setPosts'; payload: Post[] }
  | { type: 'selectPost'; payload: Post | null }
  | { type: 'setComments'; payload: Comment[] }
  | { type: 'addComment'; payload: Comment }
  | { type: 'deleteComment'; payload: number }
  | { type: 'setError'; payload: string }
  | { type: 'setLoading'; payload: boolean };
