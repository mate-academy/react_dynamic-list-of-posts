import React, { createContext, useEffect, useState } from 'react';
import * as postsService from './api/posts';
import * as userService from './api/users';
import * as commentsService from './api/comments';
import { User } from './types/User';
import { Post } from './types/Post';
import { Comment } from './types/Comment';

type GlobalProps = {
  users: User[];
  setUsers: (u: User[]) => void;
  comments: Comment[];
  setComments: (c: Comment[]) => void;
  userName: string;
  setUserName: (str: string) => void;
  posts: Post[];
  setPosts: (p: Post[]) => void;
  userId: number;
  setUserId: (n: number) => void;
  postId: number;
  setPostId: (n: number) => void;
  isLoadingPosts: boolean;
  setIsLoadingPosts: (b: boolean) => void;
  isVisibleError: boolean;
  setIsVisibleError: (b: boolean) => void;
  isLoadingComments: boolean;
  setIsLoadingComments: (b: boolean) => void;
  isErrorComments: boolean;
  setIsErrorComments: (b: boolean) => void;
};

export const GlobalContext = createContext<GlobalProps>({
  users: [],
  setUsers: () => { },
  comments: [],
  setComments: () => { },
  userName: 'Choose a user',
  setUserName: () => { },
  posts: [],
  setPosts: () => {},
  userId: 0,
  setUserId: () => {},
  postId: 0,
  setPostId: () => {},
  isLoadingPosts: false,
  setIsLoadingPosts: () => {},
  isVisibleError: false,
  setIsVisibleError: () => {},
  isLoadingComments: false,
  setIsLoadingComments: () => {},
  isErrorComments: false,
  setIsErrorComments: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userName, setUserName] = useState('Choose a user');
  const [userId, setUserId] = useState(0);
  const [postId, setPostId] = useState(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isErrorComments, setIsErrorComments] = useState(false);

  useEffect(() => {
    userService.getUsers()
      .then(setUsers);
  }, []);

  useEffect(() => {
    postsService.getPosts(userId)
      .then((newPosts) => {
        setPosts(newPosts);
        setIsVisibleError(false);
      })
      .catch(() => {
        setIsVisibleError(true);
        setPosts([]);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }, [userId]);

  useEffect(() => {
    commentsService.getComments(postId)
      .then((newComments) => {
        setComments(newComments);
        setIsErrorComments(false);
      })
      .catch(() => {
        setComments([]);
        setIsErrorComments(true);
      })
      .finally(() => setIsLoadingComments(false));
  }, [postId]);

  return (
    <GlobalContext.Provider value={{
      users,
      setUsers,
      userName,
      setUserName,
      posts,
      setPosts,
      userId,
      setUserId,
      comments,
      setComments,
      postId,
      setPostId,
      isLoadingPosts,
      setIsLoadingPosts,
      isVisibleError,
      setIsVisibleError,
      isLoadingComments,
      setIsLoadingComments,
      isErrorComments,
      setIsErrorComments,
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
