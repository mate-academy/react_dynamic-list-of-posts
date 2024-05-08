import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Post } from '../types/Post';
import { getPosts } from '../api/posts';
import { useUsers } from './UserProvider';

interface PostContextI {
  posts: Post[];
  selectedPost: Post | null;
  selectPost: (id: Post | null) => void;
  isLoading: boolean;
  isError: boolean;
}

const PostContext = createContext<PostContextI>({
  posts: [],
  selectedPost: null,
  selectPost: () => {},
  isLoading: false,
  isError: false,
});

export const PostProvider: FC<PropsWithChildren> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, selectPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedUser } = useUsers();

  useEffect(() => {
    if (selectedUser) {
      setIsLoading(true);
      getPosts(selectedUser.id)
        .then(data => setPosts(data))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const value = {
    posts,
    selectedPost,
    selectPost,
    isLoading,
    isError,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePosts = () => useContext(PostContext);
