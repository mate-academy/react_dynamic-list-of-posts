const BASE_URL = 'https://mate-api.herokuapp.com/comments';

export async function getPostComments(id) {
  const response = await fetch(`${BASE_URL}`);
  const result = await response.json();
  const comments = await result.data;

  return comments.filter(comment => comment.postId === +id);
}

export function addComment(comment) {
  const options = {
    method: 'POST',
    body: JSON.stringify(comment),
  };

  return fetch(`${BASE_URL}`, options);
}

export function deleteComment(comment) {
  const options = {
    method: 'DELETE',
  };

  return fetch(`${BASE_URL}/${comment}`, options);
}
