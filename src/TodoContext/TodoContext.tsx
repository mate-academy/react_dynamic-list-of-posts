import React, { useEffect, useState } from 'react';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { User } from '../types/User';
import { getUserPosts, getUsers } from '../utils/users';
// import { Errors } from '../types/Errors';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  users: User[];
  selectedUser: User | undefined;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isDropdownActive: boolean;
  setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  userPosts: Post[],
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | undefined,
  setSelectedPost: (post: Post | undefined) => void,
  postDetails: Post | null,
  setPostDetails: (post: Post) => void,
  postComments: Comment[],
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  setAvailNewComment: React.Dispatch<React.SetStateAction<boolean>>,
  availNewComment: boolean,
  loadingComments: boolean,
  setLoadingComments: React.Dispatch<React.SetStateAction<boolean>>,
  errorMessage: boolean,
  setErrorMessage: (message: boolean) => void,
};

export const TodosContext = React.createContext<ContextType>({
  users: [],
  selectedUser: undefined,
  setSelectedUser: () => {},
  isDropdownActive: false,
  setIsDropdownActive: () => {},
  isLoading: false,
  setIsLoading: () => {},
  userPosts: [],
  setUserPosts: () => {},
  selectedPost: undefined,
  setSelectedPost: () => {},
  postDetails: null,
  setPostDetails: () => {},
  postComments: [],
  setPostComments: () => {},
  setAvailNewComment: () => {},
  availNewComment: false,
  setLoadingComments: () => {},
  loadingComments: false,
  errorMessage: false,
  setErrorMessage: () => {},

});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postComments, setPostComments] = useState<Comment[]>([]);
  const [availNewComment, setAvailNewComment] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  useEffect(() => {
    getUsers()
      .then(allUsers => {
        setUsers(allUsers);
      })
      .catch(() => {
        setErrorMessage(true);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setUserPosts([]);
      setIsLoading(true);

      getUserPosts(selectedUser.id)
        .then((posts) => {
          setUserPosts(posts);
        })
        .catch(() => {
          setErrorMessage(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedUser]);

  return (
    <TodosContext.Provider value={{
      users,
      setSelectedUser,
      selectedUser,
      isDropdownActive,
      setIsDropdownActive,
      isLoading,
      setIsLoading,
      userPosts,
      setUserPosts,
      setSelectedPost,
      selectedPost,
      postDetails,
      setPostDetails,
      postComments,
      setPostComments,
      setAvailNewComment,
      availNewComment,
      setLoadingComments,
      loadingComments,
      errorMessage,
      setErrorMessage,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
