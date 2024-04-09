import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Post } from '../types/Post';
import type { IState } from '../types/State';
import type { User } from '../types/User';
import type { Comment } from '../types/Comment';
import * as servicesUsers from '../api/users';

export const StateContext = createContext<IState>({
  users: [],
  setUsers: () => {},
  selectUser: null,
  setSelectUser: () => {},
  posts: null,
  setPosts: () => {},
  selectPost: null,
  setSelectPost: () => {},
  comments: [],
  setComments: () => {},
  hasErrorMessage: false,
  setHasErrorMessage: () => {},
  isPostLoading: false,
  setIsPostLoading: () => {},
  isCommentLoading: false,
  setIsCommentLoading: () => {},
  isSideBarOpen: false,
  setIsSideBarOpen: () => {},
  isFormOpen: false,
  setIsFormOpen: () => {},
});

export type Props = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [selectPost, setSelectPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await servicesUsers.getUsers();

        setUsers(fetchedUsers);
      } catch (error) {}
    };

    fetchUsers();
  }, []);

  const value = {
    users,
    setUsers,
    selectUser,
    setSelectUser,
    posts,
    setPosts,
    selectPost,
    setSelectPost,
    comments,
    setComments,
    hasErrorMessage,
    setHasErrorMessage,
    isPostLoading,
    setIsPostLoading,
    isCommentLoading,
    setIsCommentLoading,
    isSideBarOpen,
    setIsSideBarOpen,
    isFormOpen,
    setIsFormOpen,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export const useGlobalContext = () => useContext(StateContext);
