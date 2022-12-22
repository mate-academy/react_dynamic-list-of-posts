import {
  FC,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';

import {
  getComments,
  addComment,
  removeComment,
} from '../../api/comments';

import { Comment } from '../../types/Comment';
import { PostsContext } from '../PostsContext';

type Props = {
  children: React.ReactNode;
};

type Context = {
  comments: Comment[] | null;
  hasError: boolean;
  isLoading: boolean;
  addCommentToServer: (tempComment: Comment) => void;
  removeCommentFromServer: (commentId: number) => void;
};

export const CommentsContext = createContext<Context>({
  comments: null,
  hasError: false,
  isLoading: false,
  addCommentToServer: () => {},
  removeCommentFromServer: () => {},
});

export const CommentsProvider: FC<Props> = ({ children }) => {
  const { selectedPost } = useContext(PostsContext);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCommentsFromServer = useCallback(async () => {
    if (selectedPost) {
      try {
        setHasError(false);
        setIsLoading(true);

        const commentsFromServer = await getComments(selectedPost.id);

        setComments(commentsFromServer);
        setIsLoading(false);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        throw new Error('Unable to get post comments!');
      }
    }
  }, [selectedPost]);

  const addCommentToServer = useCallback(async (newComment: Comment) => {
    if (selectedPost) {
      try {
        setHasError(false);

        const tempComment = await addComment(selectedPost.id, newComment);

        setComments((current) => (current && tempComment
          ? [...current, tempComment]
          : [tempComment]));
      } catch (error) {
        setHasError(true);
        throw new Error('Unable to add a post comment!');
      }
    }
  }, [selectedPost]);

  const removeCommentFromServer = useCallback(async (commentId: number) => {
    if (selectedPost) {
      try {
        setHasError(false);

        setComments((current) => (
          current?.filter((comment) => comment.id !== commentId) || null
        ));

        await removeComment(commentId);
      } catch (error) {
        setHasError(true);
        throw new Error('Unable to remove a post comment!');
      }
    }
  }, [selectedPost]);

  useEffect(() => {
    setComments(null);

    if (selectedPost !== null) {
      getCommentsFromServer();
    }
  }, [selectedPost]);

  const contextValue = {
    comments,
    hasError,
    isLoading,
    addCommentToServer,
    removeCommentFromServer,
  };

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};
