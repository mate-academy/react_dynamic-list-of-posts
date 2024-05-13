import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Comment } from '../types/Comment';
import { PostContext } from './PostProvider';
import { getPostComments, deleteComment, createComment } from '../api/comments';

interface State {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  removeComment: (commentId: number) => void;
  addComment: (commentData: Omit<Comment, 'id'>) => void;
}

const initialState: State = {
  comments: [],
  isLoading: false,
  isError: false,
  removeComment: () => {},
  addComment: () => {},
};

export const CommentContext = createContext(initialState);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedPost } = useContext(PostContext);

  const removeComment = (commentId: number) => {
    deleteComment(commentId)
      .then(() => {
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== commentId),
        );
      })
      .catch(() => setIsError(true));
  };

  const addComment = (commentData: Omit<Comment, 'id'>) => {
    setIsLoading(true);

    createComment(commentData)
      .then(newComment => {
        setComments([...comments, newComment]);
        setIsError(false);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (selectedPost?.id) {
      setIsLoading(true);

      getPostComments(selectedPost?.id)
        .then(commentsFromServer => {
          setComments(commentsFromServer);
          setIsError(false);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedPost]);

  const value = { comments, isError, isLoading, addComment, removeComment };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
};
