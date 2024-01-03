import { Actions } from '../../../libs/enums';
import { PostsAction, PostsState } from './types';

export type PostsReducer = (
  state: PostsState,
  action: PostsAction,
) => PostsState;

export const postsReducer: PostsReducer = (state, action) => {
  switch (action.type) {
    case Actions.SetPosts: {
      const { posts } = action.payload;

      return { ...state, posts };
    }

    case Actions.SetPost: {
      const { selectedPost } = action.payload;

      return { ...state, selectedPost };
    }

    default:
      return state;
  }
};
