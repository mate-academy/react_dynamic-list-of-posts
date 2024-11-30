import { Comment } from '../types/Comment';
import { client } from './fetchClient';

export const commentClient = {
  get(postId: number) {
    return client.get<Comment[]>(`/comments?postId=${postId}`);
  },

  add(newComment: Omit<Comment, 'id'>) {
    return client.post<Comment>('/comments', newComment);
  },

  delete(id: number) {
    return client.delete(`/comments/${id}`);
  },
};
