import { Comment } from '../../types/Comment';
import { client } from '../../utils/fetchClient';

export const postComment = (newComment: Comment) => {
  return client.post<Comment>('/comments', newComment);
};
