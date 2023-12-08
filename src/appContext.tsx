import React, { useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
  isDropdown: boolean;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  setIsDropdown: (q: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (q: User | null) => void;
  selectedPost: Post | null;
  setSelectedPost: (q: Post | null) => void;
  posts: Post[];
  setPosts: (q: Post[]) => void;
  isLoader: boolean;
  setIsLoader: (q: boolean) => void;
  isError: boolean;
  setIsError: (q: boolean) => void;
}

export const AppContext = React.createContext<Props>({
  users: [],
  setUsers: () => {},
  isDropdown: false,
  setIsDropdown: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  posts: [],
  setPosts: () => {},
  isLoader: false,
  setIsLoader: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  isError: false,
  setIsError: () => {},
  comments: [],
  setComments: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        isDropdown,
        setIsDropdown,
        selectedUser,
        setSelectedUser,
        posts,
        setPosts,
        isLoader,
        setIsLoader,
        selectedPost,
        setSelectedPost,
        isError,
        setIsError,
        comments,
        setComments,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
