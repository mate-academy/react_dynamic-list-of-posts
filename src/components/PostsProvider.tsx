import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/User';
import { client } from '../utils/fetchClient';
import { Post } from '../types/Post';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  users: User[];
  userPosts: Post[];
  loading: boolean;
  errorMessage: string;
  selectedPost: Post | null;
  handleButtonClick: (post: Post) => void;
  noPostsCondition: boolean
};

export const PostsContext = createContext<ContextType>({
  selectedUser: null,
  setSelectedUser: () => undefined,
  users: [],
  userPosts: [],
  loading: false,
  errorMessage: '',
  selectedPost: null,
  handleButtonClick: () => undefined,
  noPostsCondition: false,
});

export const usePosts = () => {
  return useContext(PostsContext);
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const noPostsCondition = !loading && errorMessage === ''
    && !userPosts.length && selectedUser !== null;

  const getUsers = () => {
    return client.get<User[]>('/users');
  };

  const getUserPosts = (userId: number) => {
    return client.get<Post[]>(`/posts?userId=${userId}`);
  };

  const handleButtonClick = (post: Post) => {
    if (selectedPost?.id === post.id) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };

  useMemo(() => {
    getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);

      getUserPosts(selectedUser.id)
        .then(setUserPosts)
        .catch(() => setErrorMessage('Something went wrong!'))
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  const values: ContextType = {
    selectedUser,
    setSelectedUser,
    users,
    userPosts,
    loading,
    errorMessage,
    selectedPost,
    handleButtonClick,
    noPostsCondition,
  };

  return (
    <PostsContext.Provider value={values}>
      {children}
    </PostsContext.Provider>
  );
};
