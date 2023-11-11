import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { User } from '../../types/User';
import { Post } from '../../types/Post';
import { Comment } from '../../types/Comment';

interface ValuesTypes {
  users: User[] | null;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
  showUsers: boolean;
  setShowUsers: React.Dispatch<React.SetStateAction<boolean>>;
  userSelected: User | null;
  setUserSelected: React.Dispatch<React.SetStateAction<User | null>>;
  errorPosts: string;
  setErrorPosts: React.Dispatch<React.SetStateAction<string>>;
  isLoadingPosts: boolean;
  setIsLoadingPosts: React.Dispatch<React.SetStateAction<boolean>>;
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  postSelected: Post | null;
  setPostSelected: React.Dispatch<React.SetStateAction<Post | null>>;
  errorUsers: string;
  setErrorUsers: React.Dispatch<React.SetStateAction<string>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  errorComments: string;
  setErrorComments: React.Dispatch<React.SetStateAction<string>>;
  isLoadingComments: boolean;
  setIsLoadingComments: React.Dispatch<React.SetStateAction<boolean>>;
  commentToDelete: Comment | null;
  setCommentToDelete: React.Dispatch<React.SetStateAction<Comment | null>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingCommentSending: boolean;
  setIsLoadingCommentSending: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<ValuesTypes | undefined>(undefined);

if (UserContext === undefined) {
  throw new Error('useUser must be used within a UserProvider');
}

// eslint-disable-next-line max-len
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [userSelected, setUserSelected] = useState<User | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [postSelected, setPostSelected] = useState<Post | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null);

  const [showUsers, setShowUsers] = useState<boolean>(false);

  const [errorPosts, setErrorPosts] = useState<string>('');
  const [errorUsers, setErrorUsers] = useState<string>('');
  const [errorComments, setErrorComments] = useState<string>('');

  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [
    isLoadingCommentSending,
    setIsLoadingCommentSending,
  ] = useState<boolean>(false);

  const [showForm, setShowForm] = useState<boolean>(false);

  const values: ValuesTypes = {
    users,
    setUsers,
    showUsers,
    setShowUsers,
    userSelected,
    setUserSelected,
    errorPosts,
    setErrorPosts,
    isLoadingPosts,
    setIsLoadingPosts,
    posts,
    setPosts,
    postSelected,
    setPostSelected,
    errorUsers,
    setErrorUsers,
    comments,
    setComments,
    errorComments,
    setErrorComments,
    isLoadingComments,
    setIsLoadingComments,
    commentToDelete,
    setCommentToDelete,
    showForm,
    setShowForm,
    isLoadingCommentSending,
    setIsLoadingCommentSending,
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): ValuesTypes => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
