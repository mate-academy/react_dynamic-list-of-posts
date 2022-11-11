import {
  FC, createContext, useState, useContext, useCallback, useEffect,
} from 'react';
import { Comment } from '../../types/Comment';
import { deleteComment, getComments, postComment } from '../Api/comments';
import { PostsContext } from '../PostsProvider';

// #region ---- TYPES ------
type Props = {
  children: React.ReactNode,
};

type Context = {
  comments: Comment[] | null,
  isError: boolean,
  isLoading: boolean,
  addComment: (tempComment: Comment) => void,
  removeComment: (commentId: number) => void,
};

// #endregion

export const CommentsContext = createContext<Context>({
  comments: null,
  isError: false,
  isLoading: false,
  addComment: () => {},
  removeComment: () => {},
});

export const CommentsProvider: FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedPost } = useContext(PostsContext);

  // loading comments from API server
  const loadComments = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    if (selectedPost) {
      try {
        const commentsFromServer = await getComments(selectedPost.id);

        setComments(commentsFromServer);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        throw new Error('Unable load post comments');
      }
    }
  }, [selectedPost]);

  // adding comment on server
  const addComment = useCallback(async (tempComment: Comment) => {
    setIsError(false);

    if (selectedPost) {
      try {
        const newComment = await postComment(
          selectedPost.id, tempComment,
        );

        setComments(current => (current && newComment
          ? [...current, newComment]
          : [newComment]));
      } catch (error) {
        setIsError(true);
        throw new Error('Unable load post comments');
      }
    }
  }, [selectedPost]);

  // remove comment from server
  const removeComment = useCallback(async (commentId: number) => {
    setIsError(false);

    if (selectedPost) {
      try {
        setComments(current => (
          current?.filter(comment => comment.id !== commentId) || null));

        await deleteComment(commentId);
      } catch (error) {
        setIsError(true);
        throw new Error('Unable load post comments');
      }
    }
  }, [selectedPost]);

  useEffect(() => {
    setComments(null);

    if (selectedPost !== null) {
      loadComments();
    }
  }, [selectedPost]);

  const contextValue = {
    comments,
    isError,
    isLoading,
    addComment,
    removeComment,
  };

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};
