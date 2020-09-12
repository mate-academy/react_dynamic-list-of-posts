const BASE_URL = 'https://mate-api.herokuapp.com/comments';

export function getPostComments(postId) {
  return fetch(`${BASE_URL}`)
    .then(response => response.json())
    .then(result => result.data)
    .then(comments => (
      comments.filter(comment => comment.postId === +postId)
    ));
}

export function removeComment(id) {
  const url = `${BASE_URL}/${id}`;
  const options = {
    method: 'DELETE',
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(result => result.data);
}

export function addComment(postId, name, email, body) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      postId, name, email, body,
    }),
  };

  return fetch(BASE_URL, options);
}
