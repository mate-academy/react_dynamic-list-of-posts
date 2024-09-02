import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

interface Props {
  postsLoading: boolean;
  postsError: boolean;
  posts: Post[];
  getUserPosts: (userId: number) => Promise<void>;
  setActivePost: Dispatch<SetStateAction<Post | null>>;
  activePost: Post | null;
}

const PostsContext = createContext<Props | undefined>(undefined);

const PostsContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [postsLoading, setPostsLoading] = useState(false);
  const [postsError, setPostsError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);

  const getUserPosts = async (userId: number) => {
    try {
      setPostsLoading(true);
      setPostsError(false);
      const res = await client.get<Post[]>(`/posts?userId=${userId}`);

      setPosts(res);
    } catch (error) {
      setPostsError(true);
      throw error;
    } finally {
      setPostsLoading(false);
    }
  };

  const contextValue = {
    postsLoading,
    postsError,
    posts,
    getUserPosts,
    setActivePost,
    activePost,
  };

  return (
    <PostsContext.Provider value={contextValue}>
      {children}
    </PostsContext.Provider>
  );
};

const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error(
      'usePostsContext must be used within a PostsContextProvider',
    );
  }

  return context;
};

export { PostsContextProvider, usePostsContext };
