import { RootState } from 'store';

export const selectPosts = (state:RootState) => state.posts.posts;
export const selectSelectedPost = (state:RootState) => state.posts.selectedPost;
