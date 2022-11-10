import {
  FC, createContext, useState, useContext, useCallback, useEffect,
} from 'react';
import { Comment } from '../../types/Comment';
import { getComments } from '../Api/posts';
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
  const { selectedPost } = useContext(PostsContext);

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

  useEffect(() => {
    if (selectedPost !== null) {
      loadComments();
    }
  }, [selectedPost]);

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
