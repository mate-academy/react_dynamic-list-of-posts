import React, { Dispatch, SetStateAction, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

type PostsContextType = {
  users: User[] | null,
  setUsers: Dispatch<SetStateAction<User[] | null>>,
  selectedUser: User | null,
  setSelectedUser: Dispatch<SetStateAction<User | null>>,
  userPosts: Post[] | null,
  setUserPosts: Dispatch<SetStateAction<Post[] | null>>,
  selectedPost: Post | null,
  setSelectedPost: Dispatch<SetStateAction<Post | null>>,
  postComments: Comment[] | null,
  setPostComments: Dispatch<SetStateAction<Comment[] | null>>,
  hasFormError: boolean,
  setHasFormError: Dispatch<SetStateAction<boolean>>,
};

export const PostsContext = React.createContext<PostsContextType>({
  users: [],
  setUsers: () => {},
  selectedUser: null,
  setSelectedUser: () => {},
  userPosts: [],
  setUserPosts: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  postComments: [],
  setPostComments: () => {},
  hasFormError: false,
  setHasFormError: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[] | null>(null);
  const [hasFormError, setHasFormError] = useState(false);

  const value = {
    users,
    setUsers,
    selectedUser,
    setSelectedUser,
    userPosts,
    setUserPosts,
    selectedPost,
    setSelectedPost,
    postComments,
    setPostComments,
    hasFormError,
    setHasFormError,
  };

  return (
    <PostsContext.Provider
      value={value}
    >
      {children}
    </PostsContext.Provider>
  );
};
