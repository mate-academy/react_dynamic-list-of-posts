import {
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  useMemo,
} from 'react';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { Post } from '../types/Post';

type AppContextType = {
  users: User[],
  selectUser: (user: User) => void,
  selectedUser: User | null,
  posts: Post[] | null,
  postsAreLoading: boolean,
  showPostsError: boolean,
  selectedPost: Post | null,
  setSelectedPost: Dispatch<SetStateAction<Post | null>>,
};

const AppContextDefault = {
  users: [],
  selectUser: () => { },
  selectedUser: null,
  posts: null,
  postsAreLoading: false,
  showPostsError: false,
  selectedPost: null,
  setSelectedPost: () => { },
};

export const AppContext = createContext<AppContextType>(AppContextDefault);

type Props = PropsWithChildren;

// CUSTOM PROVIDER
export const AppContextProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [postsAreLoading, setPostsAreLoading] = useState<boolean>(false);
  const [showPostsError, setShowPostsError] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // LOAD USERS
  const loadUsers = async () => {
    const response = await client.get<User[]>('/users');

    setUsers(response);
  };

  // LOAD POSTS
  const loadUserPosts = async () => {
    setShowPostsError(false);
    setPostsAreLoading(true);

    try {
      const response = await client.get<Post[]>(`/posts?userId=${selectedUser?.id}`);

      setPosts(response);
    } catch (error) {
      setShowPostsError(true);
    } finally {
      setPostsAreLoading(false);
    }
  };

  // SELECT USER
  const selectUser = (user: User) => {
    if (selectedUser && selectedUser.id === user.id) {
      return;
    }

    setSelectedUser(user);
  };

  useMemo(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      loadUserPosts();
    }
  }, [selectedUser]);

  // APP CONTEXT VALUE
  const appContextValue = {
    users,
    selectUser,
    selectedUser,
    posts,
    postsAreLoading,
    showPostsError,
    selectedPost,
    setSelectedPost,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

// CUSTOM HOOK
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside the AppContexProvicer');
  }

  return context;
};
