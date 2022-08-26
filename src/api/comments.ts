import {
  request,
  // BASE_URL,
} from './request';

export const getPostComments = (postId: string) => request(
  `/comments?postId=${postId}`,
);

const post = (url: string, data: NewComment) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  });
};

// const patch = (url: string, data: NewComment) => {
//   return request(url, {
//     method: 'PATCH',
//     headers: {
//       'Content-type': 'application/json; charset=utf-8',
//     },
//     body: JSON.stringify(data),
//   });
// };

// const updateComment = (commentId: string, newComment: NewComment) => {
//   return patch(`//`)
// };

export const createComment = (newComment : NewComment) => {
  return post('/comments', newComment);
};

const remove = (url: string) => {
  return request(url, {
    method: 'DELETE',
  });
};

export const deleteComment = (commentId: string) => {
  // eslint-disable-next-line no-console
  console.log('commentId = ', commentId);

  return remove(`/comments/${commentId}`);
};
