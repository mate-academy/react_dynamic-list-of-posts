import React, { useMemo, useState } from 'react';
import { Post } from './types/Post';
import { User } from './types/User';
import { Comment } from './types/Comment';

interface PostsGlobalContext {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  userPosts: Post[],
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  postComments: Comment[],
  setPostComments: React.Dispatch<React.SetStateAction<Comment[]>>,
}

export const PostsContext = React.createContext<PostsGlobalContext>({
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
});

type Props = {
  children: React.ReactNode;
};

export const PostsProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postComments, setPostComments] = useState<Comment[]>([]);

  const value = useMemo(() => {
    return {
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
    };
  }, [users, selectedUser, userPosts, selectedPost, postComments]);

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};
