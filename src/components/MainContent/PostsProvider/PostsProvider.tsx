import {
  FC, createContext, useState, useEffect, useCallback, useContext,
} from 'react';
import { Post } from '../../../types/Post';
import { getPosts } from '../../Api/posts';
import { UsersContext } from '../../UsersProvider';

type Props = {
  children: React.ReactNode,
};

type Context = {
  userPosts: Post[] | null,
  isError: boolean,
  isLoading: boolean,
  selectedPostId: number,
  handlePostSelection: (id: number) => void,
};

export const PostsContext = createContext<Context>({
  userPosts: null,
  isError: false,
  isLoading: false,
  selectedPostId: 0,
  handlePostSelection: () => {},
});

export const PostsProvider: FC<Props> = ({ children }) => {
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPostId, setSelectedPostId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedUserId } = useContext(UsersContext);

  const loadPosts = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const postsFromServer = await getPosts(selectedUserId);

      setUserPosts(postsFromServer);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      throw new Error('Unable load user posts');
    }
  }, [selectedUserId]);

  const handlePostSelection = useCallback((id: number) => (
    setSelectedPostId(id)
  ), []);

  useEffect(() => {
    if (selectedUserId !== 0) {
      loadPosts();
    }
  }, [selectedUserId]);

  const contextValue = {
    userPosts,
    isError,
    isLoading,
    selectedPostId,
    handlePostSelection,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};
