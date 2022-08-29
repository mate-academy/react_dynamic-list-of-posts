import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string
}

export interface InitialState {
  posts: Post[]
}

const initialState: InitialState = {
  posts: []
}

export const postSlice: Slice<InitialState> = createSlice({
  name: 'posts',
	initialState,
	reducers: {
    setPosts: (
      state,
      action: PayloadAction<Post[]>
    ) => {
      state.posts = action.payload
    }
  },
});

export default postSlice.reducer;
