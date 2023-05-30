import { Dispatch, SetStateAction } from 'react';
import { Error } from './Error';
import { Post } from './Post';
import { Loading } from './Loading';
import { Comment } from './Comment';

export interface PostsListProps {
  currentPostId: number;
  posts: Post[];
  setCurrentPost: (post: Post | null) => void;
  setLoading: (loading: Loading) => void;
  setComments: Dispatch<SetStateAction<Comment[]>>
  setError: (error: Error) => void;
}
