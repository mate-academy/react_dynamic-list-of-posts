import { Post } from './Post';

export interface PostsListProps {
  currentPostId: number;
  posts: Post[];
  getComments: (post: Post) => void;
}
