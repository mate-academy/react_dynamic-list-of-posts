import { createContext, useEffect, useMemo, useState } from 'react';
import { Post } from '../types/Post';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';

interface PostsContextValue {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  filteredPosts: Post[];
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleUserSelect: (user: User) => void;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

export const PostsContext = createContext<PostsContextValue>({
  posts: [],
  setPosts: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  filteredPosts: [],
  error: null,
  setError: () => {},
  isLoading: false,
  setIsLoading: () => {},
  handleUserSelect: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
});

interface PostsProviderProps {
  children: React.ReactNode;
}
export const PostsProvider: React.FC<PostsProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleUserSelect = (user: User) => {
    setIsLoading(true);
    setSelectedUser(user);
  };

  useEffect(() => {
    if (!selectedUser) {
      setPosts([]);
      setIsLoading(false);

      return;
    }

    setPosts([]);
    setIsLoading(true);
    client
      .get<Post[]>(selectedUser ? `/posts?userId=${selectedUser.id}` : '/posts')
      .then(fetchedPosts => {
        setPosts(fetchedPosts);
      })
      .catch(() => {
        setError('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedUser]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => post.userId === selectedUser?.id);
  }, [selectedUser, posts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        selectedUser,
        setSelectedUser,
        filteredPosts,
        error,
        setError,
        isLoading,
        setIsLoading,
        handleUserSelect,
        selectedPost,
        setSelectedPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
