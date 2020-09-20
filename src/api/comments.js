const BASE_URL = 'https://mate-api.herokuapp.com';

export function getPostComments(postId) {
  return fetch(`${BASE_URL}/comments/`)
    .then(response => response.json())
    .then(result => result.data)
    .then(comments => (
      comments.filter(comment => comment.postId && comment.postId === postId)
    ));
}

export function addComment(postId, name, email, body) {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId,
      name,
      email,
      body,
    }),
  });
}

export function deleteComment(commentId) {
  return fetch(`${BASE_URL}/comments/${commentId}`,
    { method: 'DELETE' })
    .then(response => response.json())
    .then(result => result.data);
}
