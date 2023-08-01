import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from '../types/User';
import * as userAPI from '../api/userAPI';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type ProviderProps = {
  children: ReactNode;
};

type ContextProps = {
  users: User[];
  setUsers: (users: User[]) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  comments: Comment[];
  setComments: (
    comments: Comment[] | ((comments: Comment[]) => Comment[])
  ) => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  dropdown: boolean,
  setDropdown: (value: boolean) => void,
};

export const PostContext = React.createContext<ContextProps>({
  users: [],
  setUsers: () => { },
  posts: [],
  setPosts: () => { },
  comments: [],
  setComments: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
  errorMessage: '',
  setErrorMessage: () => { },
  dropdown: false,
  setDropdown: () => { },
});

export const PostProvider: React.FC<ProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    userAPI.getUsers()
      .then(setUsers)
      .catch(() => {
        setErrorMessage('Something went wrong!');
      });
  }, []);

  const value = useMemo(() => {
    return {
      users,
      setUsers,
      posts,
      setPosts,
      comments,
      setComments,
      selectedUser,
      setSelectedUser,
      selectedPost,
      setSelectedPost,
      errorMessage,
      setErrorMessage,
      dropdown,
      setDropdown,
    };
  }, [
    users,
    posts,
    comments,
    selectedUser,
    selectedPost,
    errorMessage,
    dropdown,
  ]);

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
