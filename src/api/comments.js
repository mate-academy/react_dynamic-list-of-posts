import { BASE_URL, fetchData } from './api';

const COMMENTS_REQUEST_URL = `${BASE_URL}/comments`;

export const getPostComments = async(postId) => {
  const comments = await fetchData(`${COMMENTS_REQUEST_URL}`);

  return comments.data.filter(comment => (
    comment.postId === postId && comment.body
  ));
};

export const postComment = async(commentData, errors) => {
  const errorList = Object.values(errors);

  if (errorList.some(value => value)) {
    return { ok: false };
  }

  if (Object.values(commentData).some(value => !value)) {
    return { ok: false };
  }

  const respones = await fetch(COMMENTS_REQUEST_URL, {
    method: 'POST',
    body: JSON.stringify(commentData),
  });

  return respones;
};

export const deleteComment = async(commentData) => {
  const respones = await fetch(`${COMMENTS_REQUEST_URL}/${commentData.id}`, {
    method: 'DELETE',
  });

  return respones;
};
