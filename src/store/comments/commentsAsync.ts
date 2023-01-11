import { createAsyncThunk } from '@reduxjs/toolkit';
import Comment from 'models/Comment';
import { client } from 'utilities/axiosClient';

const endpoint = '/comments';

const CommentsAsync = {
  // Fetch comments
  fetchComments: createAsyncThunk(
    'comments/fetchComments',
    async (postId: number) => {
      const comments: Comment[] = await client.get(`${endpoint}?postId=${postId}`);

      return comments;
    },
  ),
  // Create comment
  createComment: createAsyncThunk(
    'comments/createComment',
    async (commentData: Omit<Comment, 'id'>) => {
      const data = await client.post(endpoint, commentData);

      return data as Comment;
    },
  ),
  // Delete comment
  deleteComment: createAsyncThunk(
    'comments/deleteComment',
    async (commentId: number) => {
      await client.delete(`${endpoint}/${commentId}`);
    },
  ),
};

export default CommentsAsync;
