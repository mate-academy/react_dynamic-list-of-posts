import { BASE_URL, getData } from './api';

export const getPostComments = postId => getData('/comments')
  .then(comments => comments.filter(comment => comment.postId === postId))
  .catch(() => []);

export const removeComment = async(commentId) => {
  await fetch(`${BASE_URL}/comments/${commentId}`, {
    method: 'DELETE',
  });
};

export const addComment = async(comment) => {
  await fetch(`${BASE_URL}/comments`, {
    method: 'Post',
    body: JSON.stringify(comment),
  });
};
