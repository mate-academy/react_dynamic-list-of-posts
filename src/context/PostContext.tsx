import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { usePosts } from '../hooks/usePost';
import { useUsers } from '../hooks/useUsers';

interface IPostContext {
  users: User[];
  posts: Post[];
  selectedUser: User | null;
  isUserMenuOpen: boolean;
  isLoadingPosts: boolean;
  postsError: null | string;
  selectedPost: Post | null;

  handleSelectUser: (user: User) => void;
  setUserMenuOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedPost: Dispatch<SetStateAction<Post | null>>;
}

export const PostsContext = createContext<IPostContext>({
  users: [],
  posts: [],
  selectedUser: null,
  isUserMenuOpen: false,
  isLoadingPosts: false,
  postsError: null,
  selectedPost: null,

  handleSelectUser: () => {},
  setUserMenuOpen: () => {},
  setSelectedPost: () => {},
});

export const PostsProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const {
    users,
    selectedUser,
    isUserMenuOpen,

    setSelectedUser,
    setUserMenuOpen,
  } = useUsers();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { posts, postsError, isLoadingPosts } = usePosts(selectedUser);

  const handleSelectUser = useCallback(
    (user: User) => {
      setUserMenuOpen(false);
      setSelectedUser(user);
      setSelectedPost(null);
    },
    [setSelectedUser, setUserMenuOpen],
  );

  const store = useMemo(
    () => ({
      users,
      selectedUser,
      isUserMenuOpen,
      posts,
      isLoadingPosts,
      postsError,
      selectedPost,

      handleSelectUser,
      setUserMenuOpen,
      setSelectedPost,
    }),
    [
      users,
      selectedUser,
      isUserMenuOpen,
      posts,
      isLoadingPosts,
      postsError,
      selectedPost,

      handleSelectUser,
      setUserMenuOpen,
      setSelectedPost,
    ],
  );

  return (
    <PostsContext.Provider value={store}>{children}</PostsContext.Provider>
  );
};
