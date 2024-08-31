import React, { PropsWithChildren, useContext, useState } from 'react';

import { Comment, CommentData, Post, User } from '../../types';
import { FutureValue, useFuture } from '../../components/Future';

import { postsService } from '../../services/PostsService';
import { commentsService } from '../../services/CommentsService';
import { getUsers } from '../../utils/users';
import { NoUserSelectedError } from '../../errors/NoUserSelectedError';

type Context = {
  users: FutureValue<User[]>;
  selectedUser: User | null;

  selectUser: (user: User) => void;

  posts: FutureValue<Post[]>;
  selectedPost: Post | null;

  selectPost: (post: Post) => void;
  clearPostSelection: () => void;

  comments: FutureValue<Comment[]>;

  leaveComment: (comment: CommentData) => Promise<void>;
  deleteComment: (comment: Comment) => Promise<void>;
};

const AppContext = React.createContext<Context | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const users = useFuture<User[]>(getUsers, []);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const posts = useFuture(() => {
    if (!selectedUser) {
      return Promise.reject(new NoUserSelectedError());
    }

    return postsService.getUserPosts(selectedUser as User);
  }, [selectedUser]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const comments = useFuture(() => {
    if (!selectedPost) {
      return Promise.reject();
    }

    return commentsService.getPostComments(selectedPost as Post);
  }, [selectedPost]);

  function selectUser(user: User) {
    setSelectedUser(user);
    setSelectedPost(null);
  }

  function selectPost(post: Post) {
    setSelectedPost(post);
  }

  function clearPostSelection() {
    setSelectedPost(null);
  }

  async function leaveComment(comment: CommentData) {
    const newComment = await commentsService.leaveComment(
      selectedPost as Post,
      comment,
    );

    comments.setImmediately([...comments.value, newComment]);
  }

  async function deleteComment(target: Comment) {
    comments.setImmediately(
      comments.value.filter(comment => comment.id !== target.id),
    );

    try {
      await commentsService.deleteComment(target);
    } catch {
      comments.setImmediately([...comments.value]);
    }
  }

  const context: Context = {
    users,
    selectedUser,

    selectUser,

    posts,
    selectedPost,

    selectPost,
    clearPostSelection,

    comments,

    leaveComment,
    deleteComment,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext) as Context;
