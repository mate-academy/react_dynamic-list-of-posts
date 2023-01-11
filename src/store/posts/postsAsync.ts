import { createAsyncThunk } from '@reduxjs/toolkit';
import Post from 'models/Post';
import { client } from 'utilities/axiosClient';

const endpoint = '/posts';

const PostsAsync = {
  // Fetch posts
  fetchPosts: createAsyncThunk('posts/fetchPosts', async (userId: number) => {
    const posts: Post[] = await client.get(`${endpoint}?userId=${userId}`);

    return posts;
  }),
};

export default PostsAsync;
