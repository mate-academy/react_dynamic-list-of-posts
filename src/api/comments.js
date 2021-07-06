import { request } from './posts';

export const getPostComments = postId => request('/comments')
  .then(posts => posts.data.filter(post => post.postId === postId));
  // .then(posts => posts.filter(post => post.body.trim().length > 0));

export const remove = (commentId) => {
  request(`/comments/${commentId}`, { method: 'DELETE' });
};

export const create = (object) => {
  request(`/comments`, {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
};
