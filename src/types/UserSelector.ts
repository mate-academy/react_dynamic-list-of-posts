import { Loading } from './Loading';
import { Post } from './Post';
import { Error } from './Error';

export interface UserSelectorProps {
  setError: (error: Error) => void;
  setPosts: (post: Post[]) => void;
  setLoading: (loading: Loading) => void;
  setCurrentUserId: (id: number) => void;
  setCurrentPost: (post: Post | null) => void;
}
