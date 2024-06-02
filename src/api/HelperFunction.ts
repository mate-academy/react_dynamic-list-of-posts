import { Post } from '../types/Post';

export const handlePostClick = (
  post: Post,
  openPostId: number | null,
  onPostCommentSelect: (post: Post, postId: number) => void,
  toggleComments: (postId: number) => void,
  setOnClosedComments: (value: boolean) => void,
) => {
  onPostCommentSelect(post, post.id);
  toggleComments(post.id);
  setOnClosedComments(openPostId !== post.id);
};
