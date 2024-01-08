/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback, useEffect, useState,
} from 'react';
import { Post } from '../types/Post';
import { getUserPosts } from '../api/posts';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import { Comment } from '../types/Comment';
import { getPostComments } from '../api/comments';

const initialPosts: Post[] = [];
const initialUsers: User[] = [];
const initialComments: Comment[] = [];

type AppContextType = {
  posts: Post[],
  isPostsLoading: boolean,
  setIsPostsLoading: (loading: boolean) => void,
  postErrorMessage: string,
  setPostErrorMessage: React.Dispatch<React.SetStateAction<string>>,

  users: User[],
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  usersErrorMessage: string,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,

  comments: Comment[],
  errorCommentsMessage: string,
  isCommentsLoading: boolean,
  loadComments: (postId: number) => Promise<void>,
};

export const AppContext = React.createContext<AppContextType>({
  posts: initialPosts,
  isPostsLoading: false,
  setIsPostsLoading: () => {},
  postErrorMessage: '',
  setPostErrorMessage: () => {},

  users: initialUsers,
  selectedUser: null,
  setSelectedUser: () => {},
  usersErrorMessage: '',
  selectedPost: null,
  setSelectedPost: () => {},

  comments: initialComments,
  errorCommentsMessage: '',
  isCommentsLoading: false,
  loadComments: async (_postId: number) => {},
});

type Props = {
  children: React.ReactNode,
};

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [postErrorMessage, setPostErrorMessage] = useState('');
  const [usersErrorMessage, setUsersErrorMessage] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [errorCommentsMessage, setErrorCommentsMessage] = useState('');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setUsersErrorMessage('Unable to load posts'))
      .finally(() => setUsersErrorMessage(''));
  }, []);

  useEffect(() => {
    const loadPosts = async (userId: number) => {
      setIsPostsLoading(true);

      getUserPosts(userId)
        .then(postsUser => setPosts(postsUser))
        .catch(() => setPostErrorMessage('Something went wrong!'))
        .finally(() => setIsPostsLoading(false));
    };

    if (selectedUser) {
      loadPosts(selectedUser.id);
    }
  }, [selectedUser]);

  const loadComments = useCallback((postId: number) => {
    setIsCommentsLoading(true);

    return getPostComments(postId)
      .then(setComments)
      .catch(() => setErrorCommentsMessage('Something went wrong!'))
      .finally(() => setIsCommentsLoading(false));
  }, []);

  // const deleteComments = (commentId: number) => {
  //   return deleteComment(commentId)
  // };

  const value = {
    posts,
    postErrorMessage,
    setPostErrorMessage,
    isPostsLoading,
    setIsPostsLoading,
    users,
    selectedUser,
    setSelectedUser,
    usersErrorMessage,
    selectedPost,
    setSelectedPost,
    comments,
    errorCommentsMessage,
    isCommentsLoading,
    loadComments,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
