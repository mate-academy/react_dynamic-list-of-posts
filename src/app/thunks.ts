import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserPosts } from '../api/posts';
import { getUsers } from '../api/users';
import { createComment, getPostComments } from '../api/comments';
import { IComment } from '../types/IComment';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  (postId: number) => getUserPosts(postId),
);

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  () => getUsers(),
);

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  (postId: number) => getPostComments(postId),
);

export const fetchNewComment = createAsyncThunk(
  'comments/fetchNewComment',
  (comment: Omit<IComment, 'id'>) => createComment(comment),
);
