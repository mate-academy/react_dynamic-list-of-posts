import React, { useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';

interface Props {
  users: User[];
  setUsers: (users: User[]) => void;
  isDropdownActive: boolean
  setIsDropdownActive: (q: boolean) => void;
  selectedUser: User | null;
  setSelectedUser: (q: User | null) => void;
  posts: Post[];
  setPosts: (q: Post[]) => void;
  isLoader: boolean;
  setIsLoader: (q: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (q: Post | null) => void;
  isError: boolean;
  setIsError: (q: boolean) => void;
}

export const TodosContext = React.createContext<Props>({
  users: [],
  setUsers: () => { },
  isDropdownActive: false,
  setIsDropdownActive: () => { },
  selectedUser: null,
  setSelectedUser: () => { },
  posts: [],
  setPosts: () => { },
  isLoader: false,
  setIsLoader: () => { },
  selectedPost: null,
  setSelectedPost: () => { },
  isError: false,
  setIsError: () => { },
});

interface ProviderProps {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isError, setIsError] = useState(false);

  return (
    <TodosContext.Provider
      value={{
        users,
        setUsers,
        isDropdownActive,
        setIsDropdownActive,
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
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
