import { request, post } from './api';

const adress = '/comments';

export const getPostComments = postId => request(`${adress}?postId=${postId}`);

export const removeComment = commentId => request(`${adress}/${commentId}`, {
  method: 'DELETE',
});

export const creatComment = body => post(adress, body);
