import { ENDPOINTS, request } from './api';
import { ResponseError } from '../types/ResponseError';
import { Comment } from '../types/Comment';

type CommentPromise = Comment | ResponseError;

export const getPostComments = (postId: number) => (
  request<CommentPromise>(`${ENDPOINTS.comments}?postId=${postId}`)
);

export const deleteCommentById = (commentId: number) => (
  request<CommentPromise>(`${ENDPOINTS.comments}/${commentId}`, { method: 'DELETE' })
);

export const addComment = (newComment: Comment) => (
  request<CommentPromise>(
    ENDPOINTS.comments,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(newComment),
    },
  )
);
