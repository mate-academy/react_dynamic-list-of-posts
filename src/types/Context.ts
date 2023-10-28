import React from 'react';
import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

export type Context = {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  selectedUser: User | null,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>,
  userPosts: Post[];
  setUserPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  selectedPost: Post | null,
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>,
  comments: Comment[],
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};
