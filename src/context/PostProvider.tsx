import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { UserContext } from './UserProvider';

interface State {
  posts: Post[];
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: State = {
  posts: [],
  selectedPost: null,
  setSelectedPost: () => {},
  isLoading: false,
  isError: false,
};

export const PostContext = createContext(initialState);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedUser } = useContext(UserContext);

  useEffect(() => {
    if (selectedUser?.id) {
      setIsLoading(true);

      getUserPosts(selectedUser.id)
        .then(postsFromServer => {
          setPosts(postsFromServer);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  const value = { posts, selectedPost, isLoading, isError, setSelectedPost };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
