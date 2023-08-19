import { Comment, CommentData } from '../types/Comment';
import { Post } from '../types/Post';
import { User } from '../types/User';
import { client } from './fetchClient';

export const apiActions = {
  getAllUsers: () => {
    return client.get<User[]>('/users')
      .catch((e) => {
        throw new Error(e);
      });
  },

  getUserPosts: (id: number) => {
    return client.get<Post[]>(`/posts?userId=${id}`);
  },

  getPostComments: (id: number) => {
    return client.get<Comment[]>(`/comments?postId=${id}`);
  },

  addComment: (data: CommentData) => {
    return client.post<Comment>('/comments', data);
  },

  deleteComment: (id: number) => {
    return client.delete(`/comments/${id}`);
  },
};
