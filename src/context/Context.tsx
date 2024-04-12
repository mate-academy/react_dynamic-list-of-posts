import React, { SetStateAction, useEffect, useMemo, useState } from 'react';
import * as postService from '../api/posts';
import * as commentService from '../api/comments';
import * as userService from '../api/users';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { Comment } from '../types/Comment';

interface ContextProps {
  isPostsLoading: boolean;
  isCommentsLoading: boolean;
  commentError: string | null;
  postsError: string | null;
  posts: Post[] | null;
  users: User[];
  selectedUserId: number | null;
  selectedPost: Post | null;
  comments: Comment[];
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  setCommentError: (error: string) => void;
  setSelectedUserId: (id: number | null) => void;
  setSelectedPost: (post: Post | null) => void;
  setIsCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPostsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: (value: React.SetStateAction<Post[] | null>) => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const Context = React.createContext<ContextProps>({
  isPostsLoading: false,
  isCommentsLoading: false,
  commentError: null,
  postsError: null,
  posts: [],
  users: [],
  selectedUserId: null,
  selectedPost: null,
  comments: [],
  setComments: () => {},
  setCommentError: () => {},
  setSelectedUserId: () => {},
  setSelectedPost: () => {},
  setIsCommentsLoading: () => {},
  setIsPostsLoading: () => {},
  setPosts: () => {},
  setUsers: () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [postsError, setPostsError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    userService.getUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      setIsPostsLoading(true);
      setPostsError(null);

      postService
        .getPosts(selectedUserId)
        .then(result => {
          setPosts(result);
        })
        .catch(() => setPostsError('Failed to load posts'))
        .finally(() => setIsPostsLoading(false));
    }
  }, [selectedUserId]);

  useEffect(() => {
    setIsCommentsLoading(true);
    setCommentError(null);

    if (selectedPost?.id) {
      commentService
        .getComments(selectedPost.id)
        .then(result => {
          setComments(result);
        })
        .catch(() => {
          setCommentError('Failed to load comments');
        })
        .finally(() => {
          setIsCommentsLoading(false);
        });
    } else {
      setIsCommentsLoading(false);
    }
  }, [selectedPost]);

  const value: ContextProps = useMemo(
    () => ({
      isPostsLoading,
      isCommentsLoading,
      commentError,
      postsError,
      posts,
      users,
      selectedUserId,
      selectedPost,
      comments,
      setIsCommentsLoading,
      setComments,
      setIsPostsLoading,
      setCommentError,
      setPosts,
      setUsers,
      setSelectedUserId,
      setSelectedPost,
    }),
    [
      isPostsLoading,
      isCommentsLoading,
      commentError,
      postsError,
      posts,
      users,
      selectedUserId,
      selectedPost,
      comments,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
