import { Post } from '../../../../libs/types';

export type PostsState = {
  posts: Post[],
  selectedPost: Post | null,
};
