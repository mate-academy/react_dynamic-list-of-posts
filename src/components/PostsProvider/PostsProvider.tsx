import {
  FC, createContext, useState, useEffect, useCallback, useContext,
} from 'react';
import { Post } from '../../types/Post';
import { getPosts } from '../Api/posts';
import { UsersContext } from '../UsersProvider';

// #region ---- TYPES ------

type Props = {
  children: React.ReactNode,
};

type Context = {
  userPosts: Post[] | null,
  isError: boolean,
  isLoading: boolean,
  selectedPost: Post | null,
  handlePostSelection: (post: Post | null) => void,
};

// #endregion

export const PostsContext = createContext<Context>({
  userPosts: null,
  isError: false,
  isLoading: false,
  selectedPost: null,
  handlePostSelection: () => {},
});

export const PostsProvider: FC<Props> = ({ children }) => {
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedUserId } = useContext(UsersContext);

  // load Posts from API server by selected user id
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

  // handler for open/close button
  const handlePostSelection = useCallback((post: Post | null) => (
    setSelectedPost(current => {
      if (current && current.id === post?.id) {
        return null;
      }

      return post;
    })
  ), []);

  useEffect(() => {
    setUserPosts(null);
    setSelectedPost(null);

    if (selectedUserId !== 0) {
      loadPosts();
    }
  }, [selectedUserId]);

  const contextValue = {
    userPosts,
    isError,
    isLoading,
    selectedPost,
    handlePostSelection,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};
