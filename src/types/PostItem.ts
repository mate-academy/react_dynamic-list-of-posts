import { Post } from './Post';

export interface PostItemProps {
  post: Post;
  currentPostId: number;
  getComments: (post: Post) => void;
}
