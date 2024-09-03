import { Comment } from '../types/Comment';
import { client } from '../utils/fetchClient';

export const getPostCommets = (postID: number) => {
  return client.get<Comment[]>(`/comments?postId=${postID}`).catch(() => {
    throw new Error('Unable to load comments');
  });
};

export const deletePostComment = (commentID: number) => {
  return client.delete(`/comments/${commentID}`).catch(() => {
    throw new Error('Unable to delete comment');
  });
};

export const addPostComment = (newComment: Comment) => {
  return client.post(`/comments`, newComment).catch(() => {
    throw new Error('Unable to delete comment');
  });
};
