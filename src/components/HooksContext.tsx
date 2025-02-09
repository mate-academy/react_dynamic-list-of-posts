import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment, CommentData } from '../types/Comment';
import { CurError, CurLoading } from '../utils/servises';

interface Props {
  children: React.ReactNode;
}

interface ContextProps {
  loading: CurLoading;
  setLoading: React.Dispatch<React.SetStateAction<CurLoading>>;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  errorMessage: CurError | string;
  setErrorMessage: React.Dispatch<React.SetStateAction<CurError | string>>;
  selectedUser: User | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  activePost: Post | null;
  setActivePost: React.Dispatch<React.SetStateAction<Post | null>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  newComment: CommentData | null;
  setNewComment: React.Dispatch<React.SetStateAction<CommentData | null>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  errorName: boolean;
  setErrorName: React.Dispatch<React.SetStateAction<boolean>>;
  errorEmail: boolean;
  setErrorEmail: React.Dispatch<React.SetStateAction<boolean>>;
  errorText: boolean;
  setErrorText: React.Dispatch<React.SetStateAction<boolean>>;
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<ContextProps | null>(null);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(CurLoading.Empty);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<CurError | string>(
    CurError.Empty,
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<CommentData | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        allUsers,
        setAllUsers,
        errorMessage,
        setErrorMessage,
        selectedUser,
        setSelectedUser,
        posts,
        setPosts,
        activePost,
        setActivePost,
        comments,
        setComments,
        newComment,
        setNewComment,
        name,
        setName,
        email,
        setEmail,
        text,
        setText,
        errorName,
        setErrorName,
        errorEmail,
        setErrorEmail,
        errorText,
        setErrorText,
        showMenu,
        setShowMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextProps => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};
