import {
  request,
} from './request';

export const getPostComments = (postId: string | null) => request(
  `/comments?postId=${postId}`,
);

const post = (url: string, data: NewCommentType) => {
  // eslint-disable-next-line no-console
  console.log('POST data', JSON.stringify(data));

  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
};

export const createComment = (newComment : NewCommentType) => {
  return post('/comments', newComment);
};

const remove = (url: string) => {
  return request(url, {
    method: 'DELETE',
  });
};

export const deleteComment = (commentId: string) => {
  // eslint-disable-next-line no-console
  console.log('delete commentId = ', commentId);

  return remove(`/comments/${commentId}`);
};
