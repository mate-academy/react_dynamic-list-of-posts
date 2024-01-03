import { Actions } from '../../../../libs/enums';
import { Post } from '../../../../libs/types';

export type PostsAction =
  {
    type: Actions.SetPosts,
    payload: { posts: Post[] }
  }
  | {
    type: Actions.SetPost,
    payload: { selectedPost: Post | null }
  };
