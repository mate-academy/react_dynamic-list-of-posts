import { Comment } from '../types/Comment';
import { ResponseError } from '../types/ResponseError';
import { request, ENDPOINT } from './api';

// eslint-disable-next-line max-len
export const getPostComments = (postId: number): Promise<Comment[] | ResponseError> => {
  return request(`${ENDPOINT.comments}?postId=${postId}`, 'Comments is not load');
};

// eslint-disable-next-line max-len
export const deleteComment = (commentId: number): Promise<Comment[] | ResponseError> => {
  return request(`${ENDPOINT.comments}/${commentId}`, 'Comment did not find', { method: 'DELETE' });
};

export const addComment = (
  postId: number,
  name: string,
  email: string,
  body: string,
): Promise<Comment[]> => {
  return request(ENDPOINT.comments, 'Comment did not add', {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
};
