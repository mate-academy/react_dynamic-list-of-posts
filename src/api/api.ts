import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

export const getCommentsByPostsId = (postId: Post['id']) => {
  return client.get<Comment[]>('/comments')
    .then(comments => comments
      .filter(comment => comment.postId === postId));
};
