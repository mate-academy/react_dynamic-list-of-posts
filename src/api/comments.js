import { BASE_URL } from './api';

export const getPostComments = postId => fetch(`${BASE_URL}/comments`)
  .then(response => response.json())
  .then(result => result.data)
  .then(comments => comments)
  .then(comments => comments.filter(comment => comment.postId === postId))
  .catch(error => `Oooops...${error}`);

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
