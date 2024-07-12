import React, { createContext, useCallback, useEffect, useState } from 'react';
import { User } from '../types/User';
import { Post } from '../types/Post';
import { type Comment } from '../types/Comment';
import { getComments, getPosts, removeComments } from '../utils/fetchClient';

type ContextType = {
  setUsers: (users: User[]) => void;
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (selectedUser: User | null) => void;
  error: boolean;
  setError: (error: boolean) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  errorNotification: string;
  setErrorNotification: (error: string) => void;
  postsLoading: boolean;
  setPostsLoading: (postsLoader: boolean) => void;
  commentLoading: boolean;
  setCommentLoading: (commentLoading: boolean) => void;
  selectedPost: Post | null;
  setSelectedPost: (selectedPost: Post | null) => void;
  commentsFromPost: Comment[];
  setCommentsFromPost: (comment: Comment[]) => void;
  showCommentField: boolean;
  setShowCommentField: (showCommentField: boolean) => void;
  loadComments: (postId: number) => void;
  onDeleteComment: (commentId: number) => void;
};

export const ProvideContext = createContext<ContextType>({
  setUsers: () => {},
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
  error: false,
  setError: () => {},
  posts: [],
  setPosts: () => {},
  errorNotification: '',
  setErrorNotification: () => {},
  postsLoading: false,
  setPostsLoading: () => {},
  commentLoading: false,
  setCommentLoading: () => {},
  selectedPost: null,
  setSelectedPost: () => {},
  commentsFromPost: [],
  setCommentsFromPost: () => {},
  showCommentField: false,
  setShowCommentField: () => {},
  loadComments: async () => {},
  onDeleteComment: async () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [errorNotification, setErrorNotification] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [commentsFromPost, setCommentsFromPost] = useState<Comment[]>([]);
  const [showCommentField, setShowCommentField] = useState(false);

  useEffect(() => {
    setPostsLoading(true);
    setError(false);
    if (selectedUser) {
      getPosts(selectedUser.id)
        .then(setPosts)
        .catch(() => {
          setErrorNotification('Something went wrong');
          setError(true);
        })
        .finally(() => {
          setPostsLoading(false);
        });
    }
  }, [selectedUser]);

  const loadComments = useCallback(async (postId: number) => {
    setCommentLoading(true);
    setErrorNotification('');
    setShowCommentField(false);

    try {
      const commentsFromStorage = await getComments(postId);

      setCommentsFromPost(commentsFromStorage);
    } catch {
      setErrorNotification('something went wrong');
    } finally {
      setCommentLoading(false);
    }
  }, []);

  const onDeleteComment = useCallback((commentId: number) => {
    setCommentsFromPost(currentComments =>
      currentComments.filter(comment => comment.id !== commentId),
    );

    removeComments(commentId);
  }, []);

  return (
    <ProvideContext.Provider
      value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        error,
        setError,
        posts,
        setPosts,
        postsLoading,
        setPostsLoading,
        errorNotification,
        setErrorNotification,
        selectedPost,
        setSelectedPost,
        commentsFromPost,
        setCommentsFromPost,
        commentLoading,
        setCommentLoading,
        showCommentField,
        setShowCommentField,
        loadComments,
        onDeleteComment,
      }}
    >
      {children}
    </ProvideContext.Provider>
  );
};
