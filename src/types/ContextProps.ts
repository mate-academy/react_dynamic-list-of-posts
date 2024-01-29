import { Comment } from './Comment';
import { Errors } from './Errors';
import { Post } from './Post';
import { User } from './User';

export type ContextProps = {
  users: User[],
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  choosedPost: Post | null,
  setChoosedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  error: Errors,
  setError: React.Dispatch<React.SetStateAction<Errors>>,
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  isActiveComForm: boolean,
  setIsActiveComForm: React.Dispatch<React.SetStateAction<boolean>>,
};
