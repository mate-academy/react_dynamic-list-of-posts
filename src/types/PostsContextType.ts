import React from 'react';
import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export type PostsContextType = {
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  errorMessage: string,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  removeError: (time?: number) => void,
  posts: Post[],
  loadingPosts: boolean,
  loadingComments: boolean,
  setLoadingComments: React.Dispatch<React.SetStateAction<boolean>>,
  getAllUserPosts: (userId: number) => void,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  getPostDetails: (postId: number) => void,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
  openForm: boolean,
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>,
};
