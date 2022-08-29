import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string
}

interface PostState {
  posts: Post[]
  selectedPost: Post | null
}

const initialState: PostState = {
  posts: [],
  selectedPost: null
}

export const postSlice = createSlice({
  name: 'posts',
	initialState,
	reducers: {
    setPosts: (
      state,
      action: PayloadAction<Post[]>
    ) => {
      state.posts = action.payload
    },
    selectPost: (
      state,
      action: PayloadAction<Post | null>
    ) => {
      state.selectedPost = action.payload
    }
  },
});

export default postSlice.reducer;
