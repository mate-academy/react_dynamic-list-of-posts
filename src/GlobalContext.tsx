import React, { useState, useEffect } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';
import { client } from './utils/fetchClient';

type GlobalType = {
  users: User[]
  posts: Post[],
  comments: Comment[];
  selectedUser: User | null,
  selectedPost: Post | null,
  isLoadingPosts: boolean;
  isLoadingComments: boolean,
  isLoadingError: boolean,
  isErrorComments: boolean;
  setUsers: (users: User[]) => void,
  setPosts: (posts: Post[]) => void,
  setComments: (c: Comment[]) => void;
  setSelectedUser: (user: User) => void,
  setSelectedPost: (post: Post | null) => void,
  setIsLoadingComments: (b: boolean) => void;
  setIsLoadingPosts: (b: boolean) => void;
  setIsLoadingError: (b: boolean) => void,
  setIsErrorComments: (b: boolean) => void;
};

export const GlobalContext = React.createContext<GlobalType>({
  users: [],
  posts: [],
  comments: [],
  selectedUser: null,
  selectedPost: null,
  isLoadingPosts: false,
  isLoadingComments: false,
  isLoadingError: false,
  isErrorComments: false,
  setUsers: () => {},
  setPosts: () => {},
  setComments: () => {},
  setSelectedUser: () => {},
  setSelectedPost: () => {},
  setIsLoadingComments: () => {},
  setIsLoadingPosts: () => {},
  setIsLoadingError: () => {},
  setIsErrorComments: () => {},
});

type Props = {
  children: React.ReactNode
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isErrorComments, setIsErrorComments] = useState(false);

  useEffect(() => {
    client.get<User[]>('/users')
      .then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      setIsLoadingPosts(true);

      client.get<Post[]>(`/posts?userId=${selectedUser.id}`)
        .then(userPosts => {
          setPosts(userPosts);
        })
        .catch(() => setIsLoadingError(true))
        .finally(() => setIsLoadingPosts(false));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedPost) {
      setIsLoadingComments(true);

      client.get<Comment[]>(`/comments?postId=${selectedPost.id}`)
        .then(postComments => {
          setComments(postComments);
        })
        .catch(() => {
          setIsErrorComments(true);
        })
        .finally(() => {
          setIsLoadingComments(false);
          setIsLoadingError(false);
        });
    }
  }, [selectedPost]);

  return (
    <GlobalContext.Provider value={{
      users,
      posts,
      comments,
      selectedUser,
      selectedPost,
      isLoadingPosts,
      isLoadingComments,
      isLoadingError,
      isErrorComments,
      setUsers,
      setComments,
      setPosts,
      setSelectedUser,
      setSelectedPost,
      setIsLoadingPosts,
      setIsLoadingComments,
      setIsLoadingError,
      setIsErrorComments,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
