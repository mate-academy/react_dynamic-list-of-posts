import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Comment } from '../types/Comment';
import { usePosts } from './PostProvider';
import { addComment, deleteComment, getComments } from '../api/comments';

interface CommentContextI {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id'>) => void;
  deleteComment: (comment: Comment) => void;
  isLoading: boolean;
  isError: boolean;
}

const CommentContext = createContext<CommentContextI>({
  comments: [],
  deleteComment: () => {},
  isLoading: false,
  isError: false,
  addComment: () => {},
});

export const CommentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedPost } = usePosts();

  useEffect(() => {
    setIsLoading(true);
    if (selectedPost) {
      getComments(selectedPost.id)
        .then(data => setComments(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const onCommentDelete = useCallback((comment: Comment) => {
    setComments(prev => prev.filter(c => c.id !== comment.id));
    deleteComment(comment.id).catch(() =>
      setComments(prev => [...prev, comment]),
    );
  }, []);

  const onCommentAdd = useCallback((comment: Omit<Comment, 'id'>) => {
    setIsLoading(true);
    addComment(comment)
      .then(data => setComments(prev => [...prev, data]))
      .finally(() => setIsLoading(false));
  }, []);

  const value = {
    comments,
    deleteComment: onCommentDelete,
    isLoading,
    isError,
    addComment: onCommentAdd,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};

export const useComments = () => useContext(CommentContext);
