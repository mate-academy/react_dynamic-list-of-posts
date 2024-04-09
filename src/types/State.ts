import React from 'react';
import type { Post } from './Post';
import type { User } from './User';
import type { Comment } from './Comment';

export interface IState {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  selectUser: User | null;
  setSelectUser: React.Dispatch<React.SetStateAction<User | null>>;
  posts: Post[] | null;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | null>>;
  selectPost: Post | null;
  setSelectPost: React.Dispatch<React.SetStateAction<Post | null>>;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  hasErrorMessage: boolean;
  setHasErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  isPostLoading: boolean;
  setIsPostLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentLoading: boolean;
  setIsCommentLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
