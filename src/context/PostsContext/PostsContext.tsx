import {
  FC,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';

import { getPosts } from '../../api/posts';
import { Post } from '../../types/Post';
import { UsersContext } from '../UsersContext';

type Props = {
  children: React.ReactNode;
};

type Context = {
  userPosts: Post[] | null;
  hasError: boolean;
  isLoading: boolean;
  selectedPost: Post | null;
  handlePostSelection: (post: Post | null) => void;
};

export const PostsContext = createContext<Context>({
  userPosts: null,
  hasError: false,
  isLoading: false,
  selectedPost: null,
  handlePostSelection: () => {},
});

export const PostsProvider: FC<Props> = ({ children }) => {
  const { selectedUserId } = useContext(UsersContext);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getPostsFromServer = useCallback(async () => {
    try {
      setHasError(false);
      setIsLoading(true);

      const postsFromServer = await getPosts(selectedUserId);

      setUserPosts(postsFromServer);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
      throw new Error('Unable to load user posts!');
    }
  }, [selectedUserId]);

  const handlePostSelection = useCallback((post: Post | null) => {
    setSelectedPost((current) => {
      if (current && current.id === post?.id) {
        return null;
      }

      return post;
    });
  }, []);

  useEffect(() => {
    setUserPosts(null);
    setSelectedPost(null);

    if (selectedUserId !== 0) {
      getPostsFromServer();
    }
  }, [selectedUserId]);

  const contextValue = {
    userPosts,
    selectedPost,
    hasError,
    isLoading,
    handlePostSelection,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};
