import {
  FC, createContext, useState, useContext, useCallback, useEffect,
} from 'react';
import { Comment } from '../../../types/Comment';
import { getComments } from '../../Api/posts';
import { PostsContext } from '../PostsProvider';

type Props = {
  children: React.ReactNode,
};

type Context = {
  comments: Comment[] | null,
  isError: boolean,
  isLoading: boolean,
};

export const CommentsContext = createContext<Context>({
  comments: null,
  isError: false,
  isLoading: false,
});

export const CommentsProvider: FC<Props> = ({ children }) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedPostId } = useContext(PostsContext);

  const loadComments = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const commentsFromServer = await getComments(selectedPostId);

      setComments(commentsFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      throw new Error('Unable load post comments');
    }
  }, [selectedPostId]);

  useEffect(() => {
    if (selectedPostId !== 0) {
      loadComments();
    }
  }, [selectedPostId]);

  const contextValue = {
    comments,
    isError,
    isLoading,
  };

  return (
    <CommentsContext.Provider value={contextValue}>
      {children}
    </CommentsContext.Provider>
  );
};
